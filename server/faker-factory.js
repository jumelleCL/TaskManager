const { faker } = require("@faker-js/faker");

const escapeString = (str) => str.replace(/'/g, "''");

async function factory(pool) {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Comprobamos si existen usuarios
    const { rows: existingUsers } = await client.query('SELECT COUNT(*) FROM "users"');

    if (parseInt(existingUsers[0].count) === 0) {
      // Crear equipos
      const fakeTeams = Array.from({ length: 3 }, () => ({
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        created_at: new Date(),
      }));

      const insertTeamsQuery = `
        INSERT INTO "teams" (name, description, created_at)
        VALUES
          ${fakeTeams
            .map(
              (team) => `('${escapeString(team.name)}', '${escapeString(team.description)}', '${team.created_at.toISOString()}')`
            )
            .join(", ")} RETURNING id;`;

      const { rows: createdTeams } = await client.query(insertTeamsQuery);

      // Crear usuarios
      const fakeUsers = Array.from({ length: 10 }, (_, i) => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(["admin", "member"]),
        created_at: new Date(),
      }));

      const insertUsersQuery = `
        INSERT INTO "users" (name, email, password, role, created_at)
        VALUES
          ${fakeUsers
            .map(
              (user) => `('${escapeString(user.name)}', '${escapeString(user.email)}', '${escapeString(user.password)}', '${user.role}', '${user.created_at.toISOString()}')`
            )
            .join(", ")} RETURNING id;`; 

      const { rows: createdUsers } = await client.query(insertUsersQuery);

      // Asignar usuarios a equipos (team_members)
      const insertTeamMembersQuery = `
        INSERT INTO "team_members" (team_id, user_id, role)
        VALUES
          ${createdTeams
            .map((team, index) => `(${team.id}, ${createdUsers[index % createdUsers.length].id}, 'member')`) 
            .join(", ")};`;

      await client.query(insertTeamMembersQuery);

      // Crear proyectos
      const fakeProjects = Array.from({ length: 5 }, () => ({
        team_id: faker.helpers.arrayElement(createdTeams).id,
        name: faker.company.name(),
        description: faker.lorem.paragraph(),
        start_date: faker.date.past(),
        end_date: faker.date.soon(10, new Date()), 
        created_at: new Date(),
      }));

      const insertProjectsQuery = `
        INSERT INTO "projects" (team_id, name, description, start_date, end_date, created_at)
        VALUES
          ${fakeProjects
            .map(
              (project) => `(${project.team_id}, '${escapeString(project.name)}', '${escapeString(project.description)}', '${project.start_date.toISOString()}', '${project.end_date.toISOString()}', '${project.created_at.toISOString()}')`
            )
            .join(", ")};`;

      await client.query(insertProjectsQuery);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error al inicializar datos:", error);
  } finally {
    client.release();
  }
}

module.exports = { factory };

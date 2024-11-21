const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
// const { factory } = require("./faker-factory");

const app = express();

// Configuración de la base de datos
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "taskManager_db",
  password: "1234",
  port: 5432,
});

// factory(pool);

app.use(cors());
app.use(express.json());

/**
 * Devuelve todos los proyectos existentes
 */
app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    res.status(500).json({ error: "Error al obtener proyectos" });
  }
});

/**
 * Te devuelve todos los equipos existentes
 */
app.get("/api/teams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener teams:", error);
    res.status(500).json({ error: "Error al obtener teams" });
  }
});

/**
 * Crea un registro en projects, necesita que le pases todos los datos
 */
async function createProyect(team_id, name, description, start_date, end_date) {
  try {
    await pool.query("BEGIN");
    const query = `
    INSERT INTO projects (name, description, team_id, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id`;
    const values = [name, description, team_id, start_date, end_date];
    await pool.query(query, values);
    await pool.query("COMMIT");

    const result = await pool.query(
      `SELECT * FROM projects WHERE name = $1 AND team_id = $2 AND start_date = $3`,
      [name, team_id, start_date]
    );
    return result;
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
  }
}
/**
 * Para crear un proyecto nuevo
 * Dar todos los datos de la tabla
 * team_id, name, description, end_date, start_date(optional)
 */
app.post("/api/project", async (req, res) => {
  const { team_id, name, description, start_date, end_date } = req.body;
  try {
    const result = await createProyect(
      team_id,
      name,
      description,
      start_date,
      end_date
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    res.status(500).json({ error: "Error al obtener proyecto" });
  }
});

/**
 * verifica el inicio de sesion
 * devolvera un true o false
 */
app.post("/api/login", async (req, res) => {
  const { user, password } = req.body;
  try {
    const result = await pool.query(
      "select password from users where name = $1",
      [user]
    );  
    if (result.rows[0]) {
      const match = await bcrypt.compare(password, result.rows[0].password);
      console.log(match);
      
      if(match) res.json(match)
        else res.status(500).json({error: 'Credenciales invalidas.'})
    }
  } catch (e) {
    console.error("error al  encontrar user", e);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
});

async function createUser(user, password, email, role = 'member') {
  try {
    await pool.query("BEGIN");
    const query = `
    INSERT INTO users (name, password, email, role)
    VALUES ($1, $2, $3, $4) 
    RETURNING id`;
    const pswHash = await bcrypt.hashSync(password, 10);
        
    const values = [user, pswHash, email, role];
    await pool.query(query, values);
    await pool.query("COMMIT");

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email
    ]);
    return result;
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
  }
}

app.post("/api/register", async (req, res) => {
  const { user, password: psw, email} = req.body;
  try {
    const result = await createUser(user, psw, email);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

// bcrypt.hash('123', 10, function (err, hash) {
//   console.log(hash);
// })

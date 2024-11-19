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
 * Para crear un proyecto nuevo
 * Dar todos los datos de la tabla
 * team_id, name, description, end_date, start_date(optional)
 */
app.post(
  "/api/projects",
  async (
    req,
    res,
    team_id,
    name_proyect,
    description,
    start_date,
    end_date
  ) => {
    try {
      await pool.query("BEGIN");
      const qryText =
        "INSERT INTO proyects() VALUES($team_id, $name, $descripction, $start_date, $end_date, $created_at) RETURNING id";
      const values = [team_id, name_proyect, description, start_date, end_date];

      await pool.query(qryText, values);
      await pool.query("COMMIT");
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      await pool.query("ROLLBACK");
      res.status(500).json({ error: "Error al obtener proyectos" });
    }
  }
);

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
async function createProyect( team_id, name, description, start_date, end_date ) {
  await pool.query("BEGIN");
  const query = `
    INSERT INTO projects (name, description, team_id, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING id`;
  const values = [name, description, team_id, start_date, end_date];
  await pool.query(query, values);
  await pool.query("COMMIT");
}

/**
 * Te deve devolver un proyecto cuya id pases
 */
app.get("/api/projects/:team_id/:name/:description/:start_end/:end_date", async (req, res) => {
  const { team_id, name, description, start_date, end_date } = req.params;
  try {
    const result = createProyect(team_id, name, description, start_date, end_date)
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener proyecto:", error);
    res.status(500).json({ error: "Error al obtener proyecto" });
  }
});

/**
 * verifica el inicio de sesion
 * devolvera un true o false
 */
app.get("/api/user/:user/:psw", async (req, res) => {
  const { user, psw } = req.params;
  try {
    const result = await pool.query(
      "select password from users where name = $1",
      [user]
    );  
    
    if (result.rows[0]) {
      const match = await bcrypt.compare(psw, result.rows[0].password);
      console.log(match); 
      res.json(match);
    }
  } catch (e) {
    console.error("error al  encontrar user", e);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

// bcrypt.hash('123', 10, function (err, hash) {
//   console.log(hash);
// })

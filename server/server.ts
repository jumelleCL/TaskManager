import { Request, Response, NextFunction } from "express";
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'
import {Pool} from 'pg';

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "taskManager_db",
  password: "1234",
  port: 5432,
});

/**
 * Devuelve todos los proyectos existentes
 */
app.get("/api/projects", async (req: Request, res: Response) => {
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
app.get("/api/teams", async (req: Request, res: Response) => {
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
async function createProyect(team_id: number, name: string, description: string, start_date: Date, end_date: Date) {
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
 * Dandole la id de un projecto te devuelve 
 * la info del projecto y todas las tareas que tiene el projecto
 */

app.get("/api/project", async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const resultProject = await pool.query(
    `select * from projects
      where id = $1`,
    [id]
  );
    const resultTask = await pool.query(
      `select * from tasks
        where project_id = $1`,
      [id]
    );
    res.json({project: resultProject.rows[0], tasks: resultTask.rows});
  } catch (e) {
    console.error(e);
    res.status(404).json({ error: "No se encuentra dicho proyecto" });
  }
});

/**
 * Para crear un proyecto nuevo
 * Dar todos los datos de la tabla
 * team_id, name, description, end_date, start_date(optional)
 */
app.post("/api/project", async (req: Request, res: Response) => {
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
app.post("/api/login", async (req: Request, res: Response) => {
  const { user, password } = req.body;
  try {
    const result = await pool.query(
      "select password from users where name = $1",
      [user]
    );
    if (result.rows[0]) {
      const match = await bcrypt.compare(password, result.rows[0].password);
      console.log(match);

      if (match) res.json(match);
      else res.status(500).json({ error: "Credenciales invalidas." });
    }
  } catch (e) {
    console.error("error al  encontrar user", e);
    res.status(500).json({ error: "Error al encontrar el usuario" });
  }
});

/**
 * Función para crear un usuario
 * necesita que le des el
 * username, password, email, (role? opcional)
 */
async function createUser(user: string, password: string, email: string, role = "member") {
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
      email,
    ]);
    return result;
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e);
  }
}

/**
 * Te registra/crea el usuario
 * se necesita pasarle usename, password, email
 */
app.post("/api/register", async (req: Request, res: Response) => {
  const { user, password: psw, email } = req.body;
  try {
    const result = await createUser(user, psw, email);
    res.json(result);
  } catch (e) {
    console.error(e);
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

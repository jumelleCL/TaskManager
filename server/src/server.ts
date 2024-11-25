import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import bcrypt from 'bcrypt'
import { Pool } from 'pg';
import HttpError from "./models/HttpError";
import projectRouter from "./routes/projects.routes";

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
 * Te devuelve todos los equipos existentes
 */
app.get("/api/teams", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams");
    res.json(result.rows);
  } catch (error) {
    throw new HttpError(404, 'No se encuentran equipos')
  }
});

// Rutas de projectos
app.use('/api/projects', projectRouter)

//* TASK
async function addTask(task: { id_project: number, title: string, desc?: string, assigned?: number, priority?: string, status?: string }) {
  const { id_project, title, desc = '', assigned, priority = 'low', status = 'pending' } = task;
  try {
    await pool.query("BEGIN");
    const query = `
    INSERT INTO tasks (project_id ,title, description, assigned_to, priority, status)
    VALUES ($1, $2, $3, $4, $5, $6) 
    RETURNING id`;
    const values = [id_project, title, desc, assigned, priority, status];
    const insert = await pool.query(query, values);
    await pool.query("COMMIT");

    const result = await pool.query(
      `SELECT * FROM projects WHERE id = $1`,
      [insert.rows[0].id]
    );
    return result;
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e)
    throw new HttpError(500, 'Error al insertar los datos')
  }
}
app.post('/api/tasks', async (req, res) => {
  const { id, title } = req.body;
  try {
    const result = await addTask({ id_project: id, title: title })
    console.log(result)
    res.json(result)
  } catch (e) {
    console.error(e)
    throw new HttpError(500, 'Error al crear la tarea')
  }
})

//* LOGIN
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

      if (match) res.json(match);
      else throw new HttpError(403, 'Credenciales invalidas');
    }
  } catch (e) {
    throw new HttpError(404, 'No se encuentra al usuario');
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
    throw new HttpError(500, 'Error al insertar los datos')
  }
}

/**
 * Te registra/crea el usuario
 * se necesita pasarle usename, password, email
 */
app.post("/api/register", async (req, res, next) => {
  const { user, password: psw, email } = req.body;
  try {
    const result = await createUser(user, psw, email);
    res.json(result);
  } catch (e) {
    throw new Error('No se pudo registrar el user');
  }
});


// Middleware not Found
app.use((req, res) => {
  throw new HttpError(404, 'Ruta no encontrada')
})

// Middleware Errores
app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({ message: error.message })
  }
})
app.listen(5000, () => console.log("Server running on port 5000"));
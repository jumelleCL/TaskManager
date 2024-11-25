import express from "express";
import { Pool } from "pg";
import HttpError from "../models/HttpError";
const projectRouter = express.Router()


const pool = new Pool({
    user: "admin",
    host: "localhost",
    database: "taskManager_db",
    password: "1234",
    port: 5432,
});
//* PROJECTOS

/**
 * Devuelve todos los proyectos existentes
 */
projectRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM projects");
        res.json(result.rows);
    } catch (error) {
        throw new HttpError(404, 'No se encuentran projectos')
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
        const insert = await pool.query(query, values);
        await pool.query("COMMIT");

        const result = await pool.query(
            `SELECT * FROM projects WHERE id = $1`,
            [insert.rows[0].id]
        );
        return result;
    } catch (e) {
        await pool.query("ROLLBACK");
        throw new HttpError(500, 'Error al insertar los datos')
    }
}
/**
 * Dandole la id de un projecto te devuelve 
 * la info del projecto y todas las tareas que tiene el projecto
 */

projectRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;

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
        res.json({ project: resultProject.rows[0], tasks: resultTask.rows });
    } catch (e) {
        throw new HttpError(404, 'No se encuentra el projecto');
    }
});

/**
 * Para crear un proyecto nuevo
 * Dar todos los datos de la tabla
 * team_id, name, description, end_date, start_date(optional)
 */
projectRouter.post("/", async (req, res) => {
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
    } catch (e) {
        throw new HttpError(500, 'Error al crear el projecto');
    }
});


export default projectRouter;
// await pool.end()

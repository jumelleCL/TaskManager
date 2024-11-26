import express from "express";
import pool from "../Pool";
import HttpError from "../models/HttpError";
const taskRouter = express.Router()


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
taskRouter.post('/', async (req, res) => {
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

export default taskRouter;
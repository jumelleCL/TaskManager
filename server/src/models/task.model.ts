import { sendQuery } from "../Pool";

class ModelTask {
    async getAll() {
        return await sendQuery("SELECT * FROM tasks")
    }
    async getAllFromOneProject(id: number) {
        return await sendQuery(`select * from tasks
          where project_id = $1`,
            [id])
    }
    async getOne(id: number) {
        return await sendQuery(`select * from tasks
            where id = $1`,
            [id])
    }
    async addTask(task: {
        id_project: number;
        title: string;
        desc?: string;
        assigned?: number;
        priority?: string;
        status?: string;
    }) {
        const { id_project, title, desc = '', assigned, priority = 'low', status = 'pending' } = task;
        try {
            await sendQuery("BEGIN");
            const query = `
              INSERT INTO tasks (project_id, title, description, assigned_to, priority, status)
              VALUES ($1, $2, $3, $4, $5, $6) 
              RETURNING id`;
            const values = [id_project, title, desc, assigned, priority, status];
            const insert = await sendQuery(query, values);
            await sendQuery("COMMIT");

            const result = await sendQuery(
                `SELECT * FROM tasks WHERE id = $1`,
                [insert.rows[0].id]
            );
            return result;
        } catch (e) {
            await sendQuery("ROLLBACK");
            console.error(e);
            throw new Error('Error al insertar la tarea');
        }
    }
}

export default new ModelTask();
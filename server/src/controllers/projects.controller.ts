import { RequestHandler } from "express";
import { eq, like } from "drizzle-orm";
import HttpError from "../models/HttpError";
import db from "../Pool";
import { addProjectSchema } from "../../../schemas/projectSchemas";
import { projects, tasks } from "../db/schema";
import ValidationError from "../models/ValidationError";
import { checkAuth } from "../helpers/checkAuth";

const getAll: RequestHandler = async (req, res) => {
    checkAuth(req)
    const search = req.query.search;
    
    try {
        let result;
        if (search) {
            result = await db.select().from(projects).where(like(projects.name, `%${search}%`))
        } else {
            result = await db.select().from(projects)
        }
        
        res.json(result);
    } catch (error) {
        console.log(error)
        throw new HttpError(404, 'No se encuentran projectos')
    }
}

const getOne: RequestHandler = async (req, res, next) => {
    checkAuth(req)
    const id = req.params.id;
    
    try {
        const resultProject = await db.select().from(projects).where(eq(projects.id, Number(id)))
        const resultTask = await db.select().from(tasks).where(eq(tasks.projectId, Number(id)))
        res.json({ project: resultProject, tasks: resultTask });
    } catch (e) {
        throw new HttpError(404, 'No se encuentra el projecto');
    }
}

/**
 * Crea un registro en projects, necesita que le pases todos los datos
*/
async function createProyect(team_id: number, name: string, description: string, start_date: string, end_date: string) {
    try {
        type newProject = typeof projects.$inferInsert;
        const values: newProject = {
            teamId: team_id,
            name: name,
            description: description,
            startDate: start_date,
            endDate: end_date
        }
        return await db.insert(projects).values(values)
        //     await sendQuery("BEGIN");
        //     const query = `
        //   INSERT INTO projects (name, description, team_id, start_date, end_date)
        //   VALUES ($1, $2, $3, $4, $5) 
        //   RETURNING id`;
        //     const values = [name, description, team_id, start_date, end_date];
        //     const insert = await sendQuery(query, values);
        //     await sendQuery("COMMIT");
        
        //     const result = await sendQuery(
            //         `SELECT * FROM projects WHERE id = $1`,
            //         [insert.rows[0].id]
            //     );
            // return result;
        } catch (e) {
            // await sendQuery("ROLLBACK");
            console.log(e);
            
            throw new HttpError(500, 'Error al insertar los datos')
    }
}

const addOne: RequestHandler = async (req, res) => {
    checkAuth(req)
    const project = req.body;
    const { success, data, error } = addProjectSchema.safeParse(project)
    if (!success) {
        throw new ValidationError(error)
    }
    const { team_id,
        name,
        description,
        start_date,
        end_date } = data
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
}


export { getAll, getOne, addOne }
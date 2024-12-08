import { RequestHandler } from "express";
import { and, eq, like } from "drizzle-orm";
import HttpError from "../models/HttpError";
import db from "../Pool";
import { addProjectSchema, idSchema } from "../../../schemas/projectSchemas";
import { projects, tasks, users, usersjoinprojects } from "../db/schema";
import ValidationError from "../models/ValidationError";

const getAll: RequestHandler = async (req, res) => {
    const search = req.query.search;
    const data = {
        id: projects.id,
        name: projects.name,
        description: projects.description,
        startDate: projects.startAndCreatedAt,
        endDate: projects.endAt,
        modifiedAt: projects.modifiedAt,
    }

    try {
        let result;
        if (search) {
            result = await db.select(data).from(projects)
                .innerJoin(usersjoinprojects, eq(projects.id, usersjoinprojects.projectId))
                .where(and(eq(usersjoinprojects.userId, req.user.id), like(projects.name, `%${search}%`)))
        } else {
            result = await db.select(data).from(projects)
                .innerJoin(usersjoinprojects, eq(projects.id, usersjoinprojects.projectId))
                .where(eq(usersjoinprojects.userId, req.user.id))

        }

        res.json(result);
    } catch (error) {
        console.log(error)
        throw new HttpError(404, 'No se encuentran projectos')
    }
}

const getAllMembers: RequestHandler = async (req, res) => {
    
    const id = Number(req.params.id); 
    
    const { success, data, error } = idSchema.safeParse(id)
    if(!success) throw new ValidationError(error)

    try {
        const result = await db.select({userId: users.id,username: users.name}).from(users).innerJoin(usersjoinprojects, eq(users.id, usersjoinprojects.userId))
            .innerJoin(projects, eq(projects.id, usersjoinprojects.projectId))
            .where(eq(projects.id, data))

        res.send(result)
    } catch (e) {
        console.error(e);
        throw new HttpError(500, 'Error al encontrar los datos')
    }
}

const getOne: RequestHandler = async (req, res) => {
    const id =Number( req.params.id);
    
    const { success, data, error } = idSchema.safeParse(id)
    if(!success) throw new ValidationError(error)
    
    try {
        const resultProject = await db.select().from(projects).where(eq(projects.id, data))

        // Verificamos si el usuario tiene permisos en el proyecto
        const [isProjectFromUser] = await db.select().from(usersjoinprojects)
            .where(
                and(eq(resultProject[0].id, usersjoinprojects.projectId),
                    eq(usersjoinprojects.userId, req.user.id))
            )
        if (!isProjectFromUser) throw new HttpError(401, 'No podés ver este proyecto')


        const resultTask = await db.select().from(tasks).where(eq(tasks.projectId, Number(id)))

        res.json({ project: resultProject[0], tasks: resultTask });
    } catch (e) {
        throw new HttpError(404, 'No se encuentra el projecto');
    }
}


async function createProyect(user_id: number, name: string, description: string, start_date?: string, end_date?: string) {
    try {
        type newProject = typeof projects.$inferInsert;
        const values: newProject = {
            name: name,
            description: description,
            startAndCreatedAt: start_date,
            endAt: end_date
        }
        const proyect = await db.insert(projects).values(values).returning({ insertedId: projects.id })

        await db.insert(usersjoinprojects).values({ role: 'admin', projectId: proyect[0].insertedId, userId: user_id })
        return proyect;
    } catch (e) {
        console.log(e);

        throw new HttpError(500, 'Error al insertar los datos')
    }
}

const addOne: RequestHandler = async (req, res) => {
    const project = req.body;
    const { success, data, error } = addProjectSchema.safeParse(project)
    if (!success) {
        throw new ValidationError(error)
    }
    const {
        name,
        description,
        start_date,
        end_date } = data
    try {
        const result = await createProyect(
            req.user.id,
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


export { getAll, getOne, addOne, getAllMembers }
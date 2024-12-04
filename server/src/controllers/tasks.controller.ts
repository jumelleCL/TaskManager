import { RequestHandler } from "express";
import HttpError from "../models/HttpError";
import ValidationError from "../models/ValidationError";
import { tasks } from "../db/schema";
import db from "../Pool";
import { AddTaskSchema, UpdateTaskSchema } from "../../../schemas/taskSchemas";
import { eq } from "drizzle-orm";

const addTask: RequestHandler = async (req, res) => {
    const {success, data, error} = AddTaskSchema.safeParse(req.body);
    if(!success) throw new ValidationError(error)
    try {
        type newTask = typeof tasks.$inferInsert;

        const values: newTask = { projectId: data.projectId, title: data.title, description: data.description || '', priority: 'low', status: 'pending' }
        const result = await db.insert(tasks).values(values).returning()

        res.json(result)
    } catch (e) {
        console.error(e)
        throw new HttpError(500, 'Error al crear la tarea')
    }
}

const updateTask: RequestHandler = async (req, res) => {
    const {success, data, error} = UpdateTaskSchema.safeParse(req.body);
    if(!success) throw new ValidationError(error)
        type newTask = typeof tasks.$inferInsert;

    const values: newTask = {id: data.id, title: data.title, description: data.description}
    const result = await db.update(tasks).set({ 
        title: data.title,
        description: data.description
    }).where(eq(tasks.id, values.id ))
}

export {addTask, updateTask}
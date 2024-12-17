import { RequestHandler } from "express";
import HttpError from "../models/HttpError";
import ValidationError from "../models/ValidationError";
import { tasks } from "../db/schema";
import db from "../Pool";
import { AddTaskSchema, UpdateTaskSchema } from "./../schemas/taskSchemas";
import { eq } from "drizzle-orm";
import { idSchema } from "../schemas/projectSchemas";

const addTask: RequestHandler = async (req, res) => {
    const { success, data, error } = AddTaskSchema.safeParse(req.body);
    if (!success) throw new ValidationError(error)
    try {
        type newTask = typeof tasks.$inferInsert;

        const values: newTask = { projectId: data.projectId, title: data.title, description: data.description || null, priority: 'low', status: 'pending' }
        const result = await db.insert(tasks).values(values).returning()

        res.json(result)
    } catch (e) {
        console.error(e)
        throw new HttpError(500, 'Error al crear la tarea')
    }
}

const updateTask: RequestHandler = async (req, res) => {
    const { success, data, error } = UpdateTaskSchema.safeParse(req.body);    
    if (!success) throw new ValidationError(error)
    type newTask = typeof tasks.$inferInsert;

    const values: newTask = {
        id: data.id, 
        title: data.title, 
        description: data.description || null, 
        priority: data.priority, 
        status: data.status, 
        projectId: data.projectId,
        assignedTo: data.assigned_to || null,
    }
    console.log(values);
    

    try {
        const result = await db.update(tasks).set({
        title: data.title,
            description: data.description,
            priority: data.priority,
            status: data.status,
            assignedTo: data.assigned_to
        }).where(eq(tasks.id, values.id!))
    
        console.log(result);
        res.json(result);
    } catch (e) {
        throw new HttpError(500, 'Fallo al intentar actualizar los datos')
    }

    
}

const deleteTask: RequestHandler = async (req, res) => {
    const id = Number(req.params.id);
    
    const { success, data: validatedId, error } = idSchema.safeParse(id)
    if (!success) throw new ValidationError(error)

    try {
        const result = await db.delete(tasks).where(eq(tasks.id, validatedId))
        res.send(result)
    } catch (e) {
        throw new HttpError(500, 'Error al eliminar la tarea')
    }

}

export { addTask, deleteTask, updateTask }
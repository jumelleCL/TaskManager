import { RequestHandler } from "express";
import HttpError from "../models/HttpError";
import taskModel from "../models/task.model";
import { tasks } from "../db/schema";
import db from "../Pool";

const addTask: RequestHandler = async (req, res) => {
    const { id, title } = req.body;
    try {
        
        type newTask = typeof tasks.$inferInsert;

        const values: newTask = { projectId: id, title: title , priority: 'low', status: 'pending' }
        const result = await db.insert(tasks).values(values).returning()

        res.json(result)
    } catch (e) {
        console.error(e)
        throw new HttpError(500, 'Error al crear la tarea')
    }
}

export {addTask}
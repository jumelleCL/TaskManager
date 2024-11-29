import { RequestHandler } from "express";
import HttpError from "../models/HttpError";
import taskModel from "../models/task.model";

const addTask: RequestHandler = async (req, res) => {
    const { id, title } = req.body;
    try {
        const result = await taskModel.addTask({ id_project: id, title: title })
        res.json(result)
    } catch (e) {
        console.error(e)
        throw new HttpError(500, 'Error al crear la tarea')
    }
}

export {addTask}
import express from "express";
import { addTask, deleteTask, updateTask } from "../controllers/tasks.controller";
const taskRouter = express.Router()


taskRouter.post('/', addTask)

taskRouter.delete('/:id', deleteTask)

taskRouter.put('/', updateTask)

export default taskRouter;
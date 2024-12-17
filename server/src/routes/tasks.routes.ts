import express from "express";
import { addTask, deleteTask, updateTask, updateTaskStatus } from "../controllers/tasks.controller";
const taskRouter = express.Router()


taskRouter.post('/', addTask)

taskRouter.delete('/:id', deleteTask)

taskRouter.put('/', updateTask)
taskRouter.put('/:id', updateTaskStatus)

export default taskRouter;
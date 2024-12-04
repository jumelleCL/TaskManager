import express from "express";
import { addTask, updateTask } from "../controllers/tasks.controller";
const taskRouter = express.Router()


taskRouter.post('/', addTask)

taskRouter.put('/', updateTask)

export default taskRouter;
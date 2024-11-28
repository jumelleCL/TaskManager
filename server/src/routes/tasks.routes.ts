import express from "express";
import { addTask } from "../controllers/tasks.controller";
const taskRouter = express.Router()


taskRouter.post('/', addTask)

export default taskRouter;
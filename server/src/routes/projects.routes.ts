import express from "express";
import { getAll ,addOne, getOne } from "../controllers/projects.controller";
const projectRouter = express.Router()

projectRouter.get("/", getAll);
projectRouter.get("/:id", getOne);
projectRouter.post("/", addOne);


export default projectRouter;
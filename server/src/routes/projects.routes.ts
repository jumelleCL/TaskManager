import express from "express";
import { getAll ,addOne, getOne } from "../controllers/projects.controller";
const projectRouter = express.Router()

projectRouter.get("/", getAll);
projectRouter.post("/", addOne);
projectRouter.get("/:id", getOne);


export default projectRouter;
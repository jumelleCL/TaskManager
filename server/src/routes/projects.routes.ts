import express from "express";
import { getAll ,addOne, getOne, getAllMembers } from "../controllers/projects.controller";
const projectRouter = express.Router()

projectRouter.get("/", getAll);
projectRouter.post("/", addOne);
projectRouter.get('/members/:id', getAllMembers)
projectRouter.get("/:id", getOne);


export default projectRouter;
import express from "express";
import { getAll ,addOne, getOne, getAllMembers, editOne, addMembersByEmail } from "../controllers/projects.controller";
const projectRouter = express.Router()

projectRouter.get("/", getAll);
projectRouter.post("/", addOne);
projectRouter.post("/:id", editOne);
projectRouter.get('/members/:id', getAllMembers)
projectRouter.get("/:id", getOne);
projectRouter.post("/users/:id", addMembersByEmail);



export default projectRouter;
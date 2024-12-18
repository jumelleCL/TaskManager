import express from "express";
import { getAll ,addOne, getOne, getAllMembers, editOne, addMembersByEmail, deleteMembersById } from "../controllers/projects.controller";
const projectRouter = express.Router()

projectRouter.get("/", getAll);
projectRouter.post("/", addOne);
projectRouter.post("/:id", editOne);
projectRouter.get("/:id", getOne);

//* Devuelve todos los miembros de un proyecto
projectRouter.get('/members/:id', getAllMembers)
projectRouter.post("/members/:id", addMembersByEmail);

projectRouter.delete('/members/:id', deleteMembersById)

export default projectRouter;
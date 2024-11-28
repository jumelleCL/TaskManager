import express from "express";
import { getAll } from "../controllers/teams.controller";
const teamsRouter = express.Router()

teamsRouter.get("/", getAll);

export default teamsRouter;
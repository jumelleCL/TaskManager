import express from "express";
import { addUser, checkUser } from "../controllers/users.controller";
const usersRouter = express.Router()

usersRouter.post("/register", addUser);

usersRouter.post("/login", checkUser);

export default usersRouter;
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import HttpError from "./models/HttpError";
import * as routes from './routes/routes'
import ValidationError from "./models/ValidationError";
import { checkAuth } from "./helpers/checkAuth";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


// Rutas
app.use('/api/teams', routes.teamsRouter)

app.use('/api/projects', checkAuth, routes.projectRouter)

app.use('/api/tasks', checkAuth, routes.taskRouter)

app.use('/api/users', checkAuth, routes.usersRouter)


// Middleware not Found
app.use((req, res) => {
  throw new HttpError(404, 'Ruta no encontrada')
})

// Middleware Errores
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({ message: error.message })
  }
  if (error instanceof ValidationError){
    res.status(400).send({message: error.errors})
  }
})
app.listen(5000, () => console.log("Server running on port 5000"));
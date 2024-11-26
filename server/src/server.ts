import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import HttpError from "./models/HttpError";
import * as routes from './routes/routes'

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


// Rutas
app.use('/api/teams', routes.teamsRouter)
app.use('/api/projects', routes.projectRouter)
app.use('/api/tasks', routes.taskRouter)
app.use('/api/users', routes.usersRouter)


// Middleware not Found
app.use((req, res) => {
  throw new HttpError(404, 'Ruta no encontrada')
})

// Middleware Errores
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).send({ message: error.message })
  }
})
app.listen(5000, () => console.log("Server running on port 5000"));
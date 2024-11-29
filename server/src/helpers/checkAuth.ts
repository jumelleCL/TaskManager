import { NextFunction, Request, Response } from "express";
import HttpError from "../models/HttpError";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {    
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(!token) throw new HttpError(401, 'Sin autorización / no hay token')
    else next()
}
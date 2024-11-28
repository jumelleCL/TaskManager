import { RequestHandler } from "express";
import HttpError from "../models/HttpError";
import teamModel from "../models/team.model";
import { teams } from "../db/schema";
import db from "../Pool";

const getAll: RequestHandler =  async (req, res) => {
    try {
        const result = await db.select().from(teams) //teamModel.getAll();
        res.json(result);
    } catch (error) {
        throw new HttpError(404, 'No se encuentran equipos')
    }
}

export {getAll}
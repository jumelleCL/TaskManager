import express from "express";
import pool from "../Pool";
import HttpError from "../models/HttpError";
const teamsRouter = express.Router()

/**
 * Te devuelve todos los equipos existentes
 */
teamsRouter.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM teams");
        res.json(result.rows);
    } catch (error) {
        throw new HttpError(404, 'No se encuentran equipos')
    }
});

export default teamsRouter;
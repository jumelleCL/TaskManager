import express from "express";
import pool from "../Pool";
import bcrypt from 'bcrypt'
import HttpError from "../models/HttpError";
const usersRouter = express.Router()

/**
 * Función para crear un usuario
 * necesita que le des el
 * username, password, email, (role? opcional)
 */
async function createUser(user: string, password: string, email: string, role = "member") {
    try {
        await pool.query("BEGIN");
        const query = `
      INSERT INTO users (name, password, email, role)
      VALUES ($1, $2, $3, $4) 
      RETURNING id`;
        const pswHash = await bcrypt.hashSync(password, 10);

        const values = [user, pswHash, email, role];
        await pool.query(query, values);
        await pool.query("COMMIT");

        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ]);
        return result;
    } catch (e) {
        await pool.query("ROLLBACK");
        throw new HttpError(500, 'Error al insertar los datos')
    }
}

/**
 * Te registra/crea el usuario
 * se necesita pasarle usename, password, email
 */
usersRouter.post("/register", async (req, res, next) => {
    const { user, password: psw, email } = req.body;
    try {
        const result = await createUser(user, psw, email);
        res.json(result);
    } catch (e) {
        throw new Error('No se pudo registrar el user');
    }
});
//* LOGIN
/**
 * verifica el inicio de sesion
 * devolvera un true o false
 */
usersRouter.post("/login", async (req, res) => {
    const { user, password } = req.body;
    try {
        const result = await pool.query(
            "select password from users where name = $1",
            [user]
        );
        if (result.rows[0]) {
            const match = await bcrypt.compare(password, result.rows[0].password);

            if (match) res.json(match);
            else throw new HttpError(403, 'Credenciales invalidas');
        }
    } catch (e) {
        throw new HttpError(404, 'No se encuentra al usuario');
    }
});

export default usersRouter;
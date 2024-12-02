import { RequestHandler } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { eq } from "drizzle-orm";
import HttpError from "../models/HttpError";
import 'dotenv/config';
import db from "../Pool";
import { users } from "../db/schema";
import { AddUserSchema, LoginSchema } from "../../../schemas/userSchemas";
import ValidationError from "../models/ValidationError";

const addUser: RequestHandler = async (req, res, next) => {
    const user = req.body;
    const { success, data, error } = AddUserSchema.safeParse(user)
    if (!success) throw new ValidationError(error)
    const { username: name, password: psw, email } = data;

    const userExists = await db.select().from(users).where(eq(users.email, email))
    if (userExists) throw new HttpError(400, 'Hay algún error en los campos')
    try {

        type newUser = typeof users.$inferInsert;

        const password = await bcrypt.hash(psw, 10)
        const values: newUser = { name: name, password: password, email: email, role: 'member' }
        const result = await db.insert(users).values(values).returning()
        // userModel.createUser(user, psw, email);

        // console.log('intento register', result);

        res.json(result);
    } catch (e) {
        throw new HttpError(500, 'No se pudo registrar el user');
    }
}

const checkUser: RequestHandler = async (req, res) => {
    const user = req.body;    

    const { success, data, error } = LoginSchema.safeParse(user)
    if (!success) {
        throw new ValidationError(error)
    }

    const { username: name, password } = data;
    try {
        const [result] = await db.select().from(users).where(eq(users.name, name));
        if (result) {
            const match = await bcrypt.compare(password, result.password);
            
            if (match) {
                const SECRET = process.env.SECRET_KEY
                const token = jwt.sign({ username: result.name, role: result.role }, SECRET!)
                res.cookie('access_token', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000),
                    sameSite: 'none',
                    secure: true,
                })
                res.send({ user: result.name })
            }
            else throw new HttpError(401, 'Credenciales inválidas');
        } else throw new HttpError(401, 'Credenciales inválidas');
    } catch (e) {
        console.log('er', e);

        throw new HttpError(401, 'Credenciales inválidas');
    }
}

export { addUser, checkUser }
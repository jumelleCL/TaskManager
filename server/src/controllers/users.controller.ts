import { RequestHandler } from "express";
import userModel from "../models/user.model";
import bcrypt from 'bcrypt'
import HttpError from "../models/HttpError";
import db from "../Pool";

const addUser: RequestHandler = async (req, res, next) => {
    const { user, password: psw, email } = req.body;
    console.log('a')
    try {
        const password = bcrypt.hash(psw, 10)
        console.log('b')
        try {
            const result = await db.insert(user).values({user: user, psw: password, email: email}) // userModel.createUser(user, psw, email);
            
        } catch (e) {
            console.error(e)
        
        }
        console.log('c')
        // console.log('intento register', result);
        
        res.json('si');
    } catch (e) {
        throw new Error('No se pudo registrar el user');
    }
}

const checkUser: RequestHandler = async (req, res) => {
    const { user, password } = req.body;
    try {
        const result = await userModel.getOne(user);
        if (result.rows[0]) {
            const match = await bcrypt.compare(password, result.rows[0].password);

            if (match) res.json(match);
            else throw new HttpError(403, 'Credenciales invalidas');
        }
    } catch (e) {
        throw new HttpError(404, 'No se encuentra al usuario');
    }
}

export {addUser, checkUser}
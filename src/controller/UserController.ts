import {getRepository as context} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as bcrypt from 'bcrypt';
import {User} from "../models/User";

export const getAll = async (req: Request, res: Response) => {
    const users = await context(User).find();

    return res.json(users);
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const user = await context(User).findOne(id);

    return res.json(user);
}

export const create = async (req: Request, res: Response) => {
    const { name, email, role, age, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await context(User).save({
        name,
        email,
        role,
        age,
        password: passwordHash
    });

    return res.json(user);
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {name, email, role, age, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 8);
    
    const user = await context(User).update(id, {
        name,
        email,
        role,
        age,
        password: passwordHash
    });

    if(user.affected == 1){
        const userNew = await context(User).findOne(id);
        return res.json(userNew);
    }

    return res.status(404).json({ message: "Usuario não encontrado"});
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await context(User).delete(id);

    if(user.affected == 1){
        await context(User).findOne(id);
        return res.json({ message: 'Usuario removido!'});
    }

    return res.status(404).json({ message: "Usuario não encontrado"});
}
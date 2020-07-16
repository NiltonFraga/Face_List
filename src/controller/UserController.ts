import { Request, Response } from "express";
import { UserRepository } from '../Repository/user/UserRepository';
import { isNullOrUndefined, isObject } from "util";

const userRepository = new UserRepository();

export const getAll = async (req: Request, res: Response) => {

    const users = userRepository.index();

    users.then(users =>{
        if(!isNullOrUndefined(users))
            return res.status(200).json(users);
    })
}

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params
    
    const user = userRepository.show(id);

    user.then(resp =>{
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp})
    })
}

export const create = async (req: Request, res: Response) => {
    const user = req.body;

    const newUser = userRepository.create(user);

    newUser.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json(resp);
        else
            return res.status(400).json({ message: resp})
    })
}

export const update = async (req: Request, res: Response) => {
   
    const { id } = req.params;

    const user = req.body;
    
    const newUser = userRepository.update(id, user)

    newUser.then(user =>{
        if(isObject(user))
            return res.status(200).json(user);
        else
            return res.status(404).json({ message: user});
    })
}

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = userRepository.remove(id)

    user.then(resp =>{
        if(!isNullOrUndefined(resp))
            return res.status(200).json({ message: resp});
        else
            return res.status(404).json({ message: "Usuario não encontrado"});
    })
}
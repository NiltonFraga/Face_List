import { Request, Response } from 'express';
import { LoginRepository } from '../repository/login/LoginRepository';
import { isObject } from 'util';

const loginRepository = new LoginRepository();

export const login = async (req: Request, res: Response) => {

    let params = req.body

    const login = loginRepository.login(params)

    login.then(resp => {
        if(isObject(resp))
            return res.status(200).json(resp);
        else
            return res.status(404).json({ message: resp})
    })
}
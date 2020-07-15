import { Request, Response, NextFunction } from 'express';
import { getRepository as context} from 'typeorm';
import { User } from '../models/User'

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const id = res.locals.jwtPayload.userId;

        const userRepository = context(User);

        let user: User

        try{
            user = await userRepository.findOneOrFail(id);
        }catch(id){
            res.status(401).json({ message: "Usuario nao encontrado"})
        }

        if(roles.indexOf(user.role) > -1)
            next();
        else
            res.status(401).json({ message: "Usuario sem permisao"});
    } 
}
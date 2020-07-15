import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if(!auth || auth == 'Bearer'){
        return res.status(401).json({ message: 'Token nao inserido'});
    }

    const [ , token] = auth.split(' ');

    let payload;

    try{
        payload = jwt.verify(token, process.env.SECRET);
        res.locals.jwtPayload = payload;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Token invalido!'});
    }
}
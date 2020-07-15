import { User } from '../models/User';
import * as jwt from'jsonwebtoken';
import * as bcrypt from'bcrypt';
import { Request, Response } from 'express';
import { getRepository as context} from 'typeorm';

export const login = async (req: Request, res: Response) => {
    const { email, password} = req.body;

    const user = await context(User).find({ where: { email }});
    
    if(user.length == 1){
        if(await bcrypt.compare(password, user[0].password)){
            const token = jwt.sign(
                {userId: user[0].id, username: user[0].name}, 
                process.env.SECRET, 
                {expiresIn: '1d'}
            )
            
            const data = {
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                role: user[0].role,
                age: user[0].role,
                token
            }

            return res.json(data)
        }else{
            return res.status(404).json({ message: 'User not found'});
        }
    }else{
        return res.status(404).json({ message: 'User not found'});
    }
}
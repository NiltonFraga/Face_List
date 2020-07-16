import { User } from '../../models/User';
import * as bcrypt from 'bcrypt';
import { getRepository as context } from "typeorm";
import * as jwt from'jsonwebtoken';

export class LoginRepository{

    public async login(user: any){
         
        const {email, password} = user;
        
        const userFind = await context(User).find({ where: { email }});

        if(userFind.length == 1){
            if(await bcrypt.compare(password, userFind[0].password)){
                const token = jwt.sign(
                    {userId: userFind[0].id, username: userFind[0].name}, 
                    process.env.SECRET, 
                    {expiresIn: '1d'}
                )
                
                const data = {
                    id: userFind[0].id,
                    name: userFind[0].name,
                    email: userFind[0].email,
                    role: userFind[0].role,
                    age: userFind[0].role,
                    token
                }
    
                return data;
            }else{
                return "Email ou Password incorreto";
            }
        }else{
            return 'Usuario não encontrado';
        }
    }
}
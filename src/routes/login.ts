import {Router, Request, Response} from  'express';
import { login } from '../controller/LoginController';

const routerLogin = Router();

routerLogin.get('/', (req: Request, res: Response) => {
    return res.json({ message: "auth_api"});
});

routerLogin.post('/login', login);

export default routerLogin;
import {Router, Request, Response} from  'express';
import { create, getAll, getById, remove, update}  from './controller/UserController'
import { login } from './controller/AuthController'
import { checkJwt } from "./middlewares/checkJwt";
import { checkRole } from "./middlewares/checkRole";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: "ola"});
});

routes.post('/login', login);

routes.get('/user',  getAll);
routes.get('/user/:id', [checkJwt, checkRole(["USER"])], getById);
routes.post('/user',  create);
routes.put('/user/:id',  update);
routes.delete('/user/:id',  remove);

export default routes;
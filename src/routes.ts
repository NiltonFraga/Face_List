import {Router, Request, Response} from  'express';
import { create, getAll, getById, remove, update}  from './controller/UserController'

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    return res.json({ message: "ola"});
});

routes.get('/user',  getAll);
routes.get('/user/:id',  getById);
routes.post('/user',  create);
routes.put('/user/:id',  update);
routes.delete('/user/:id',  remove);

export default routes;
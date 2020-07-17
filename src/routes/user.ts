import { Router } from  'express';
import { create, getAll, getById, remove, update}  from '../controller/UserController'
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const routerUser = Router();

routerUser.get('/user', [checkJwt], getAll);
routerUser.get('/user/:id', [checkJwt], getById);
routerUser.post('/user', [checkJwt, checkRole(["ADMIN"])], create);
routerUser.put('/user/:id', [checkJwt, checkRole(["ADMIN"])], update);
routerUser.delete('/user/:id', [checkJwt, checkRole(["ADMIN"])], remove);

export default routerUser;
import { Router } from 'express';
import userController from '../Controllers/user.controller';

const router: Router = Router();

router.get('/',  userController.getUsers);

router.post('/new', userController.addUser);

// router.delete('/:id', clientController.deleteById);

export { router };

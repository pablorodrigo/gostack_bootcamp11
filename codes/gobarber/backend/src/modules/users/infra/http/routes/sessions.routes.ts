import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();
// return registered data
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService(new UserRepository());

  const user = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default sessionsRouter;

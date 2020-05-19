import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';

const sessionsRouter = Router();
// return registered data
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const user = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default sessionsRouter;

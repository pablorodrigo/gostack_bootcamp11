import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// return registered data
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const user = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

export default sessionsRouter;

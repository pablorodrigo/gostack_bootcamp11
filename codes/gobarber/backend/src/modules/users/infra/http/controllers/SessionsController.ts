import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserService);

    const user = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  async index(request: Request, response: Response): Promise<Response> {
    return response.json({ status: 'index' });
  }

  async show(request: Request, response: Response): Promise<Response> {
    return response.json({ status: 'show' });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ status: 'delete' });
  }

  async update(request: Request, response: Response): Promise<Response> {
    return response.json({ status: 'update' });
  }
}

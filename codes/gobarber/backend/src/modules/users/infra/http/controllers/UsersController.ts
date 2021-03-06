import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.json({ user: classToClass(user) });
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

import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class AppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    // it create the model instance
    const providers = await listProviders.execute({
      user_id,
    });

    console.log(providers);

    return response.json(providers);
  }
}

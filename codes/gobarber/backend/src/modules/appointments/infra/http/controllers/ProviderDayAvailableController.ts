import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailableService from '@modules/appointments/services/ListProviderDayAvailableService';

export default class ProviderDayAvailableController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProviderMonthAvailable = container.resolve(
      ListProviderDayAvailableService,
    );

    const available = await listProviderMonthAvailable.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(available);
  }
}

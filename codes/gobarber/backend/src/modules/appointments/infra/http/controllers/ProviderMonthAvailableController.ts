import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailableService from '@modules/appointments/services/ListProviderMonthAvailableService';

export default class ProviderMonthAvailableController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailable = container.resolve(
      ListProviderMonthAvailableService,
    );

    const available = await listProviderMonthAvailable.execute({
      provider_id,
      month: Number(month),
      year: Number(year),
    });

    return response.json(available);
  }
}

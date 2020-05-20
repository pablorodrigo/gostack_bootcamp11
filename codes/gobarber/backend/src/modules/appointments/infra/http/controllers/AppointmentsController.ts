import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);

    // it create the model instance
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    console.log(appointment);

    return response.json(appointment);
  }
}

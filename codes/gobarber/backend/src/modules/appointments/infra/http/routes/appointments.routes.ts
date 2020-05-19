import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// return all data
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// return registered data
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  getCustomRepository(AppointmentsRepository);
  const createAppointment = new CreateAppointmentService();

  // it create the model instance
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  console.log(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import {container} from "tsyringe";
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// return all data
/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

// return registered data
appointmentsRouter.post('/', async (request, response) => {
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
});

export default appointmentsRouter;

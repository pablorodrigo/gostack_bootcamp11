import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// return all data
/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

// return registered data
appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

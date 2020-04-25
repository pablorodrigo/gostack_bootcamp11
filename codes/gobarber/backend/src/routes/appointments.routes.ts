import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// return all data
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findALl();

  return response.json(appointments);
});

// return registered data
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    console.log(appointment);

    return response.json(appointment);
  } catch (error) {
    return response
      .status(400)
      .json({ error: error.message });
  }
});

export default appointmentsRouter;

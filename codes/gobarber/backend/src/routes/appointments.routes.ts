import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// return all data
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.findALl();

  return response.json(appointments);
});

// return registered data
appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  // check if already exist date booked
  if (appointmentsRepository.findByDate(parsedDate)) {
    return response
      .status(400)
      .json({ error: 'This date is already booked' });
  }

  const appointment = appointmentsRepository.create(
    provider,
    parsedDate,
  );

  console.log(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;

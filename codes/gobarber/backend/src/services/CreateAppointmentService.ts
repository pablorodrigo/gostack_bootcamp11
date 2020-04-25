import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(
    appointmentsRepository: AppointmentsRepository,
  ) {
    this.appointmentsRepository = appointmentsRepository;
  }

  execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    // check if already exist date booked
    if (
      this.appointmentsRepository.findByDate(
        appointmentDate,
      )
    ) {
      throw Error('This date is already booked');
      /* return response
        .status(400)
        .json({ error: 'This date is already booked' }); */
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;

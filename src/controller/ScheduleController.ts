import { Request, Response } from "express";
import { Schedule } from "../types/Schedule";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

interface CustomScheduleRequest<T> extends Request {
  body: T;
}

class ScheduleController {
  schedules: Schedule[] = [];

  async store(request: CustomScheduleRequest<Schedule>, response: Response) {
    const { name, birthDate, scheduleDateTime } = request.body;

    if (!dayjs(scheduleDateTime).isValid()) {
      return response.status(400).json({ error: "Agendamento inválido." });
    }


    const scheduleDay = dayjs(scheduleDateTime).startOf("day");
    const appointmentsInDay = this.schedules.filter((sched) =>
      dayjs(sched.scheduleDateTime).startOf("day").isSame(scheduleDay)
    );

    if (appointmentsInDay.length >= 20) {
      return response
        .status(400)
        .json({ error: "Número máximo de agendamentos ao dia atingido." });
    }

    const appointmentsAtSameTime = this.schedules.filter((sched) =>
      dayjs(sched.scheduleDateTime).isSame(scheduleDateTime)
    );

    if (appointmentsAtSameTime.length >= 2) {
      return response
        .status(400)
        .json({
          error: "Número máximo de agendamentos ao mesmo tempo atingido.",
        });
    }

    const schedule: Schedule = {
      id: uuidv4(),
      name: name,
      birthDate: birthDate,
      scheduleDateTime: scheduleDateTime,
    };

    this.schedules.push(schedule);
    return response.status(201).json(schedule);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, birthDate, scheduleDateTime } = request.body;

    const scheduleIndex = this.schedules.findIndex((sched) => sched.id === id);

    const updatedSchedule: Schedule = {
      id,
      name,
      birthDate,
      scheduleDateTime,
    };

    this.schedules[scheduleIndex] = updatedSchedule;
    return response.status(200).json(updatedSchedule);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const scheduleIndex = this.schedules.findIndex((sched) => sched.id === id);

    this.schedules.splice(scheduleIndex, 1);
    return response.status(204).send();
  }

  async getAll(request: Request, response: Response) {
    return response.status(200).json(this.schedules);
  }

  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const schedule = this.schedules.find((sched) => sched.id === id);

    return response.status(200).json(schedule);
  }
}

export { ScheduleController };

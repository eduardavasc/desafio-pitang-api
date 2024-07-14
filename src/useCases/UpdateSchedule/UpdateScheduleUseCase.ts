import dayjs from "dayjs";
import { AppError } from "../../errors/AppError";
import { Schedule } from "../../models/Schedule";
import { ISchedulesRepository } from "../../repositories/IScheduleRepository";
import { IUpdateScheduleDTO } from "./UpdateScheduleDTO";

export class UpdateScheduleUseCase {
  constructor(private schedulesRepository: ISchedulesRepository) {}

  async execute(data: IUpdateScheduleDTO, scheduleId: string) {
    const scheduleExists = await this.schedulesRepository.getById(scheduleId);

    if (scheduleExists === null) {
      throw new AppError("Agendamento não encontrado na base.");
    }
    const updatedSchedule = new Schedule(
      {
        ...scheduleExists,
        scheduleConclusion: data.scheduleConclusion,
        scheduleCompleted: data.scheduleCompleted,
      },
      scheduleExists.id
    );
    await this.schedulesRepository.updateSchedule(updatedSchedule, scheduleId);
  }
}

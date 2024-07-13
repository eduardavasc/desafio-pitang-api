import dayjs from "dayjs";
import { AppError } from "../../errors/AppError";
import { Schedule } from "../../models/Schedule";
import { ISchedulesRepository } from "../../repositories/IScheduleRepository";
import { ICreateScheduleDTO } from "./CreateScheduleDTO";

export class CreateScheduleUseCase {
  constructor(private schedulesRepository: ISchedulesRepository) {}

  async execute(data: ICreateScheduleDTO) {
    const schedulesInThisDate = await this.schedulesRepository.getByDay(
      data.scheduledDate
    );

    if (schedulesInThisDate.length >= 20) {
      throw new AppError(
        "Todas as vagas para o dia selecionado já estão preenchidas."
      );
    }

    const schedulesInSameTime = await this.schedulesRepository.getByDateTime(
      data.scheduledDate
    );

    if (schedulesInSameTime.length >= 2) {
      throw new AppError(
        "Todas as vagas para o horário selecionado já estão preenchidas."
      );
    }

    const schedule = new Schedule({
      ...data,
      scheduledDate: dayjs(data.scheduledDate).startOf("hour").toDate(),
      scheduleCompleted: false,
    });

    await this.schedulesRepository.create(schedule);
  }
}

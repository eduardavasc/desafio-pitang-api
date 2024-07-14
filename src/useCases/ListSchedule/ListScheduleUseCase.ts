import { ISchedulesRepository } from "../../repositories/IScheduleRepository";
import { Schedule } from "../../models/Schedule";

export class ListSchedulesUseCase {
    constructor(private schedulesRepository: ISchedulesRepository) {}

    async execute(): Promise<Schedule[]> {
        const schedules = await this.schedulesRepository.getSchedules();
        return schedules;
    }
}

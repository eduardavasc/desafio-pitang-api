import dayjs from "dayjs";
import { ISchedulesRepository } from "../../repositories/IScheduleRepository";
import { Schedule } from "../../models/Schedule";

export class InMemoryScheduleRepository implements ISchedulesRepository {
    public schedules: Schedule[] = [];

    async create(schedule: Schedule): Promise<void> {
        this.schedules.push(schedule);
    }

    async getByDateTime(date: Date): Promise<Schedule[]> {
        return this.schedules.filter((schedule) =>
            dayjs(schedule.scheduledDate).isSame(date, "hour"),
        );
    }

    async getByDay(date: Date): Promise<Schedule[]> {
        return this.schedules.filter((schedule) =>
            dayjs(schedule.scheduledDate).isSame(date, "day"),
        );
    }
}

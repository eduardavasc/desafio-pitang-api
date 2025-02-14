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
      dayjs(schedule.scheduledDate).isSame(date, "hour")
    );
  }

  async getByDay(date: Date): Promise<Schedule[]> {
    return this.schedules.filter((schedule) =>
      dayjs(schedule.scheduledDate).isSame(date, "day")
    );
  }
  async getSchedules(): Promise<Schedule[]> {
    return this.schedules;
  }

  async updateSchedule(schedule: Schedule, scheduleId: string): Promise<Schedule> {
    const scheduleIndex = this.schedules.findIndex(
      (sched) => sched.id === scheduleId
    );

    if (scheduleIndex === -1) {
      throw new Error("Schedule not found");
    }

    const updatedSchedule = {
      ...this.schedules[scheduleIndex],
      scheduleConclusion: schedule.scheduleConclusion,
      scheduleCompleted: schedule.scheduleCompleted,
    };

    this.schedules[scheduleIndex] = updatedSchedule;

    return updatedSchedule;
  }

  async getById(id: string): Promise<Schedule | null> {
      const scheduleInMemory = this.schedules.find((sched) => sched.id === id)

      return scheduleInMemory || null
  }
}

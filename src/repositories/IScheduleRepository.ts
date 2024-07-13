import { Schedule } from "../models/Schedule";

export interface ISchedulesRepository {
  create(schedule: Schedule): Promise<void>;
  getByDateTime(date: Date): Promise<Schedule[]>;
  getByDay(date: Date): Promise<Schedule[]>;
}

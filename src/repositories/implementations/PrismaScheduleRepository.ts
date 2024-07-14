import dayjs from "dayjs";

import { PrismaClient } from "@prisma/client";
import { ISchedulesRepository } from "../IScheduleRepository";
import { Schedule } from "../../models/Schedule";

export class PrismaScheduleRepository implements ISchedulesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(schedule: Schedule): Promise<void> {
    await this.prisma.schedule.create({
      data: { ...schedule },
    });
  }

  async getByDateTime(date: Date): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: {
        scheduledDate: {
          gte: dayjs(date).startOf("hour").toDate(),
          lte: dayjs(date).endOf("hour").toDate(),
        },
      },
    });
  }

  getByDay(date: Date): Promise<Schedule[]> {
    return this.prisma.schedule.findMany({
      where: {
        scheduledDate: {
          gte: dayjs(date).startOf("day").toDate(),
          lte: dayjs(date).endOf("day").toDate(),
        },
      },
    });
  }

  getSchedules(): Promise<Schedule[]> {
      return this.prisma.schedule.findMany()
  }
}

import { PrismaScheduleRepository } from "../../repositories/implementations/PrismaScheduleRepository";
import { CreateScheduleController } from "./CreateScheduleController";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";

const prismaScheduleRepository = new PrismaScheduleRepository();

const createScheduleUseCase = new CreateScheduleUseCase(
  prismaScheduleRepository
);

const createScheduleController = new CreateScheduleController(
  createScheduleUseCase
);

export { createScheduleUseCase, createScheduleController };

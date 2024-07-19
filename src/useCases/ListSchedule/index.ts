import { PrismaScheduleRepository } from "../../repositories/implementations/PrismaScheduleRepository";
import { ListSchedulesController } from "./ListScheduleController";
import { ListSchedulesUseCase } from "./ListScheduleUseCase";


const prismaScheduleRepository = new PrismaScheduleRepository();

const listSchedulesUseCase = new ListSchedulesUseCase(
  prismaScheduleRepository
);

const listSchedulesController = new ListSchedulesController(
  listSchedulesUseCase
);

export { listSchedulesUseCase, listSchedulesController };


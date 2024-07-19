import { PrismaScheduleRepository } from "../../repositories/implementations/PrismaScheduleRepository";
import { UpdateScheduleController } from "./UpdateScheduleController";
import { UpdateScheduleUseCase } from "./UpdateScheduleUseCase";

const prismaScheduleRepository = new PrismaScheduleRepository();

const updateScheduleUseCase = new UpdateScheduleUseCase(
  prismaScheduleRepository
);

const updateScheduleController = new UpdateScheduleController(
  updateScheduleUseCase
);

export { updateScheduleController, updateScheduleUseCase };


import { Router } from "express";
import { createScheduleController } from "./useCases/CreateSchedule";
import { listSchedulesController } from "./useCases/ListSchedule";
import { updateScheduleController } from "./useCases/UpdateSchedule";

const router = Router();

router.post("/schedule", (request, response) => {
  createScheduleController.handle(request, response);
});

router.get("/schedules", (request, response) => {
  listSchedulesController.handle(request, response);
});

router.patch("/schedule/:id", (request, response) => {
  updateScheduleController.handle(request, response);
});

export { router };

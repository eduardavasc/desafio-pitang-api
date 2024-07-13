import { Router } from "express";
import { createScheduleController } from "./useCases/CreateSchedule";

const router = Router();

router.post("/schedule", (request, response) => {
  createScheduleController.handle(request, response);
});

export { router };

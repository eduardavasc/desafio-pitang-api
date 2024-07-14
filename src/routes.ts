import { Router } from "express";
import { createScheduleController } from "./useCases/CreateSchedule";
import { listSchedulesController } from "./useCases/ListSchedule";

const router = Router();

router.post("/schedule", (request, response) => {
  createScheduleController.handle(request, response);
});

router.get("/schedules", (request,response) =>{
  listSchedulesController.handle(request,response)
})

export { router };

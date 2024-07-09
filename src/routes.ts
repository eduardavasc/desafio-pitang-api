import { Router } from "express";
import { ScheduleController } from "./controller/ScheduleController";

const router = Router()
const scheduleController = new ScheduleController()

router.post('/appointment', (request, response) => {
    scheduleController.store(request, response);
});

router.get('/appointment', (request, response) => {
    scheduleController.getAll(request, response);
});

router.get('/appointment/:id', (request, response) => {
    scheduleController.getById(request, response);
});

router.patch('/appointment/:id', (request, response) => {
    scheduleController.update(request, response);
});

router.delete('/appointment/:id', (request, response) => {
    scheduleController.delete(request, response);
});




export { router }



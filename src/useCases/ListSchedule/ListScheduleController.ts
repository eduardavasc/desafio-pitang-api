import { Request, Response } from "express";
import { ListSchedulesUseCase } from "./ListScheduleUseCase";
import { AppError } from "../../errors/AppError";
import { ZodError } from "zod";


class ListSchedulesController {
    constructor(private listSchedulesUseCase: ListSchedulesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const schedules = await this.listSchedulesUseCase.execute();
            return response.json(schedules);
        } catch (error) {
          if (error instanceof AppError) {
            return response.status(400).json({
              message: error.message,
            });
          }
          if (error instanceof ZodError) {
            return response.status(400).json({
              message: error.errors[0].message,
            });
          }
          return response.status(500).json({
            message: error
          })  
        }
    }
}

export { ListSchedulesController };


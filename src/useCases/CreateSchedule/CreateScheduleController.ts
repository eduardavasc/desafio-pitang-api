import { Request, Response } from "express";
import { ICreateScheduleDTO } from "./CreateScheduleDTO";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";
import { createScheduleBodySchema } from "../../validations/createScheduleBodySchema";
import { AppError } from "../../errors/AppError";

export class CreateScheduleController {
  constructor(private createScheduleUseCase: CreateScheduleUseCase) {}

  async handle(request: Request, response: Response) {
    let data: ICreateScheduleDTO;

    try {
      data = createScheduleBodySchema.parse(request.body);
      await this.createScheduleUseCase.execute(data);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(400).json({
          message: error.message
        })
      }
      return response.status(400).json({
        message: "Dados inválidos",
      });
    }

    return response.status(201).send();
  }
}

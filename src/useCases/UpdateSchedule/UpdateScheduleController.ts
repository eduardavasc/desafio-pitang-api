import { Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../../errors/AppError";
import { updateScheduleBodySchema } from "../../validations/updateScheduleBodySchema";
import { IUpdateScheduleDTO } from "./UpdateScheduleDTO";
import { UpdateScheduleUseCase } from "./UpdateScheduleUseCase";

export class UpdateScheduleController {
  constructor(private updateScheduleUseCase: UpdateScheduleUseCase) {}

  async handle(request: Request, response: Response) {
    let data: IUpdateScheduleDTO;

    try {
      data = updateScheduleBodySchema.parse(request.body);
      await this.updateScheduleUseCase.execute(data, request.params.id);
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
        message: error,
      });
    }

    return response.status(201).send();
  }
}

import dayjs from "dayjs";
import { AppError } from "../../errors/AppError";
import { Schedule } from "../../models/Schedule";
import { InMemoryScheduleRepository } from "../../test/repositories/InMemoryScheduleRepository";
import { IUpdateScheduleDTO } from "./UpdateScheduleDTO";
import { UpdateScheduleUseCase } from "./UpdateScheduleUseCase";

let schedulesRepository: InMemoryScheduleRepository;
let updateScheduleUseCase: UpdateScheduleUseCase;

const existingSchedule: Schedule = new Schedule({
  patientName: "John Doe",
  patientBirthDate: new Date(1998, 10, 10),
  scheduledDate: dayjs().hour(0).add(1, "day").toDate(),
  scheduleCompleted: false,
  scheduleConclusion: "",
}, "testId");

beforeAll(() => {
  schedulesRepository = new InMemoryScheduleRepository();
  updateScheduleUseCase = new UpdateScheduleUseCase(schedulesRepository);
  schedulesRepository.schedules.push(existingSchedule);
});

describe("Update Schedule", () => {
  it("Should update an existing schedule", async () => {
    const payload: IUpdateScheduleDTO = {
      scheduleCompleted: true,
      scheduleConclusion: "Concluído com sucesso",
    };

    await expect(updateScheduleUseCase.execute(payload, "testId")).resolves.not.toThrow();

    const updatedSchedule = schedulesRepository.schedules.find(sched => sched.id === "testId");

    expect(updatedSchedule).toBeDefined();
    expect(updatedSchedule?.scheduleCompleted).toBe(true);
    expect(updatedSchedule?.scheduleConclusion).toBe("Concluído com sucesso");
  });

  it("Should throw an error if the schedule does not exist", async () => {
    const payload: IUpdateScheduleDTO = {
      scheduleCompleted: true,
      scheduleConclusion: "Concluído com sucesso",
    };

    await expect(updateScheduleUseCase.execute(payload, "non-existent-id")).rejects.toEqual(
      new AppError("Agendamento não encontrado na base.")
    );
  });
});

import dayjs from "dayjs";
import { AppError } from "../../errors/AppError";
import { InMemoryScheduleRepository } from "../../test/repositories/InMemoryScheduleRepository";
import { ICreateScheduleDTO } from "./CreateScheduleDTO";
import { CreateScheduleUseCase } from "./CreateScheduleUseCase";

let schedulesRepository: InMemoryScheduleRepository;
let useCase: CreateScheduleUseCase;

const payload: ICreateScheduleDTO = {
  patientBirthDate: new Date(1998, 10, 10),
  patientName: "John Doe",
  scheduledDate: dayjs().hour(0).add(1, "day").toDate(),
};

describe("Create Schedule", () => {
  beforeAll(() => {
    schedulesRepository = new InMemoryScheduleRepository();
    useCase = new CreateScheduleUseCase(schedulesRepository);
  });

  it("Should be able to create a new schedule", async () => {
    await expect(useCase.execute(payload)).resolves.not.toThrow();

    expect(schedulesRepository.schedules).toHaveLength(1);
    expect(schedulesRepository.schedules[0]).toHaveProperty("id");
  });

  it("Should not be able to create more than two schedules in the same hour", async () => {
    await useCase.execute(payload);

    expect(schedulesRepository.schedules).toHaveLength(2);

    await expect(useCase.execute(payload)).rejects.toEqual(
      new AppError(
        "Todas as vagas para o horário selecionado já estão preenchidas."
      )
    );
  });

  it("Should not be able to create more than 20 schedules in the same day", async () => {
    const promises = [];
    for (let i = 0; i < 18; i++) {
      const promise = useCase.execute({
        ...payload,
        scheduledDate: dayjs(payload.scheduledDate)
          .add(Math.ceil((i + 1) / 2), "hours")
          .toDate(),
      });
      promises.push(promise);
    }

    await Promise.all(promises);

    expect(schedulesRepository.schedules).toHaveLength(20);

    await expect(useCase.execute(payload)).rejects.toEqual(
      new AppError(
        "Todas as vagas para o dia selecionado já estão preenchidas."
      )
    );
  });
});

import { Schedule } from "../../models/Schedule";
import { InMemoryScheduleRepository } from "../../test/repositories/InMemoryScheduleRepository";
import { ICreateScheduleDTO } from "../CreateSchedule/CreateScheduleDTO";
import { ListSchedulesUseCase } from "./ListScheduleUseCase";


let schedulesRepository: InMemoryScheduleRepository;
let listSchedulesUseCase: ListSchedulesUseCase;

const payload1: ICreateScheduleDTO = {
  patientBirthDate: new Date(1990, 1, 1),
  patientName: "John Doe 2",
  scheduledDate: new Date(),
};

const payload2: ICreateScheduleDTO = {
  patientBirthDate: new Date(1995, 5, 5),
  patientName: "John Doe 3",
  scheduledDate: new Date(),
};

describe("List Schedules", () => {
  beforeAll(() => {
    schedulesRepository = new InMemoryScheduleRepository();
    listSchedulesUseCase = new ListSchedulesUseCase(schedulesRepository);
  });

  it("Should return all schedules when there are schedules in the repository", async () => {
    await schedulesRepository.create(new Schedule({ ...payload1, scheduleCompleted: false }));
    await schedulesRepository.create(new Schedule({ ...payload2, scheduleCompleted: false }));

    const schedules = await listSchedulesUseCase.execute();

    expect(schedules).toHaveLength(2);
    expect(schedules).toEqual(expect.arrayContaining([expect.objectContaining(payload1), expect.objectContaining(payload2)]));
  });

  it("Should return an empty list when there are no schedules in the repository", async () => {
    schedulesRepository = new InMemoryScheduleRepository(); 
    listSchedulesUseCase = new ListSchedulesUseCase(schedulesRepository); 

    const schedules = await listSchedulesUseCase.execute();

    expect(schedules).toHaveLength(0);
  });

  it("Should handle repository errors correctly", async () => {
    const spy = jest.spyOn(schedulesRepository, "getSchedules").mockImplementation(() => {
      throw new Error("Erro ao buscar agendamentos");
    });

    await expect(listSchedulesUseCase.execute()).rejects.toThrow("Erro ao buscar agendamentos");

    spy.mockRestore();
  });
});

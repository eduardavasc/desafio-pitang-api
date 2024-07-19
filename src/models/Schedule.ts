import { v7 as uuidV7 } from "uuid";

export class Schedule {
  public id: string;
  public scheduledDate: Date;
  public patientName: string;
  public patientBirthDate: Date;
  public scheduleCompleted: boolean;
  public scheduleConclusion?: string | null;

  constructor(props: Omit<Schedule, "id">, id?: string) {
    this.id = id ? id : uuidV7();
    this.scheduledDate = props.scheduledDate;
    this.patientName = props.patientName;
    this.patientBirthDate = props.patientBirthDate;
    this.scheduleCompleted = props.scheduleCompleted;
    this.scheduleConclusion = props.scheduleConclusion;
  }
}

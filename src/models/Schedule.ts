import { uuid } from "uuidv4";

export class Schedule {
  public readonly id: string;
  public scheduledDate: Date;
  public patientName: string;
  public patientBirthDate: Date;
  public scheduleCompleted: boolean;
  public scheduleConclusion?: string | null;

  constructor(props: Omit<Schedule, "id">, id?: string) {
    this.id = id ? id : uuid();
    this.scheduledDate = props.scheduledDate;
    this.patientName = props.patientName;
    this.patientBirthDate = props.patientBirthDate;
    this.scheduleCompleted = props.scheduleCompleted;
  }
}

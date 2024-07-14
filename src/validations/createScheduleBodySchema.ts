import { z } from "zod";

export const createScheduleBodySchema = z.object({
  scheduledDate: z.coerce
    .date({ invalid_type_error: "Data inválida" })
    .min(new Date(), "Você não pode criar um agendamento em uma data passada"),
  patientName: z.string().min(1, "Nome do paciente é obrigatório"),
  patientBirthDate: z.coerce.date({ invalid_type_error: "Data inválida" }),
});

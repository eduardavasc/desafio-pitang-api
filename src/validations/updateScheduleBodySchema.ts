import { z } from "zod";

export const updateScheduleBodySchema = z.object({
  scheduleCompleted: z.boolean({
    required_error: "Status do agendamento obrigatório.",
    invalid_type_error: "O campo scheduleCompleted deve ser um booleano.",
  }),
  scheduleConclusion: z
    .string()
    .min(1, "Conclusão do agendamento obrigatória."),
});

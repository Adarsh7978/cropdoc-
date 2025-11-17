import { z } from 'genkit';

export const ConsultExpertMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ConsultExpertMessage = z.infer<typeof ConsultExpertMessageSchema>;

export const ConsultExpertInputSchema = z.array(ConsultExpertMessageSchema);
export const ConsultExpertOutputSchema = z.string();

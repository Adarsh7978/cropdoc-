'use server';
/**
 * @fileOverview A Genkit flow for having a conversation with an AI agricultural expert.
 *
 * - consultExpert - A function that handles the conversation.
 * - ConsultExpertMessage - The type for a single message in the conversation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ConsultExpertMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ConsultExpertMessage = z.infer<typeof ConsultExpertMessageSchema>;

const ConsultExpertInputSchema = z.array(ConsultExpertMessageSchema);
const ConsultExpertOutputSchema = z.string();


export async function consultExpert(messages: ConsultExpertMessage[]): Promise<string> {
    return consultExpertFlow(messages);
}

const consultExpertFlow = ai.defineFlow(
  {
    name: 'consultExpertFlow',
    inputSchema: ConsultExpertInputSchema,
    outputSchema: ConsultExpertOutputSchema,
  },
  async (messages) => {
    const { output } = await ai.generate({
        prompt: messages,
        system: `You are an expert agricultural advisor named CropDoc AI. 
        Your role is to provide helpful, accurate, and concise advice to farmers.
        Be friendly and conversational. Keep your responses relatively short unless the user asks for detailed information.
        Do not repeat the information that is already in the chat history.
        `,
    });
    return output!;
  }
);

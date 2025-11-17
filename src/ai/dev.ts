import { config } from 'dotenv';
config();

import '@/ai/flows/diagnose-crop-disease.ts';
import '@/ai/flows/recommend-treatment.ts';
import '@/ai/flows/consult-expert.ts';
import '@/ai/schemas/consult-expert.ts';

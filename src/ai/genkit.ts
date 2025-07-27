
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import 'dotenv/config';

if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "Please set the GEMINI_API_KEY environment variable. You can get a key from Google AI Studio."
  );
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GEMINI_API_KEY,
  })],
  model: 'googleai/gemini-2.0-flash',
});

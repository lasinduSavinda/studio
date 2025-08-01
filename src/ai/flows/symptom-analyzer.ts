'use server';

/**
 * @fileOverview Analyzes user-reported symptoms and suggests potential causes or related conditions.
 *
 * - symptomAnalyzer - A function that analyzes the symptoms and provides suggestions.
 * - SymptomAnalyzerInput - The input type for the symptomAnalyzer function.
 * - SymptomAnalyzerOutput - The return type for the symptomAnalyzer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomAnalyzerInputSchema = z.object({
  mood: z.string().describe('The user reported mood.'),
  cramps: z.string().describe('The user reported cramp severity.'),
  headaches: z.string().describe('The user reported headache severity.'),
  bloating: z.string().describe('The user reported bloating severity.'),
  acne: z.string().describe('The user reported acne severity.'),
});
export type SymptomAnalyzerInput = z.infer<typeof SymptomAnalyzerInputSchema>;

const SymptomAnalyzerOutputSchema = z.object({
  suggestions: z.string().describe('Suggestions for potential causes or related conditions based on the symptoms.'),
});
export type SymptomAnalyzerOutput = z.infer<typeof SymptomAnalyzerOutputSchema>;

export async function symptomAnalyzer(input: SymptomAnalyzerInput): Promise<SymptomAnalyzerOutput> {
  return symptomAnalyzerFlow(input);
}

const symptomAnalyzerPrompt = ai.definePrompt({
  name: 'symptomAnalyzerPrompt',
  input: {schema: SymptomAnalyzerInputSchema},
  output: {schema: SymptomAnalyzerOutputSchema},
  prompt: `You are a helpful assistant designed to analyze user-reported symptoms and suggest potential causes or related conditions.

  Based on the following symptoms, provide suggestions for potential causes or related conditions.

  Mood: {{{mood}}}
  Cramps: {{{cramps}}}
  Headaches: {{{headaches}}}
  Bloating: {{{bloating}}}
  Acne: {{{acne}}}
  `,
});

const symptomAnalyzerFlow = ai.defineFlow(
  {
    name: 'symptomAnalyzerFlow',
    inputSchema: SymptomAnalyzerInputSchema,
    outputSchema: SymptomAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await symptomAnalyzerPrompt(input);
    return output!;
  }
);

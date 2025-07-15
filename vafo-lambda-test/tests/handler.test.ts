import { describe, it, expect } from 'vitest';
import { textAnalyzer } from '../src/handler';

const mockEvent = (body: any) => ({
  body: typeof body === 'string' ? body : JSON.stringify(body),
} as any);

describe('textAnalyzer Lambda handler', () => {
  it('returns 200 and analysis for valid input', async () => {
    const event = mockEvent({ text: 'hello world' });
    const response = await textAnalyzer(event);

    expect(response.statusCode).toBe(200);

    const parsed = JSON.parse(response.body);
    expect(parsed).toEqual({
      wordCount: 2,
      characterCount: 10,
      lineCount: 1,
      longestWordLength: 5,
      mostCommonLetter: 'l',
    });
  });
});

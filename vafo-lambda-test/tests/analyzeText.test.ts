import { describe, it, expect } from 'vitest';
import { analyzeText, validateTextInput } from '../src/analyzeText';

describe('analyzeText', () => {
  it('correctly analyzes simple text', () => {
    const result = analyzeText('hello world');
    expect(result).toEqual({
      wordCount: 2,
      characterCount: 10, // "helloworld"
      lineCount: 1,
      longestWordLength: 5,
      mostCommonLetter: 'l',
    });
  });

  it('handles text with multiple lines and whitespace', () => {
    const result = analyzeText('  one\n two   three ');
    expect(result).toEqual({
      wordCount: 3,
      characterCount: 11, // "onetwothree"
      lineCount: 2,
      longestWordLength: 5,
      mostCommonLetter: 'e',
    });
  });

  it('throws error for missing/empty text', () => {
    expect(() => analyzeText('')).toThrow('Request "text" field is missing or empty');
    expect(() => analyzeText('   ')).toThrow('Request "text" field is missing or empty');
    expect(() => analyzeText('\r')).toThrow('Request "text" field is missing or empty');
  });

  it('throws error for text under 5 characters in length', () => {
    expect(() => analyzeText('abc')).toThrow('Request "text" field must be at least 5 characters long');
  });

  it('throws error for text over 300 characters in length', () => {
    const longText = 'a'.repeat(301);
    expect(() => analyzeText(longText)).toThrow('Request "text" field must not exceed 300 characters');
  });

  it('returns null for mostCommonLetter if no letters are present', () => {
    const result = analyzeText('5432@2!!2_-^&2!');
    expect(result.mostCommonLetter).toBeNull();
  });
});

describe('validateTextInput', () => {
  it('does not throw for valid text', () => {
    expect(() => validateTextInput('hello world')).not.toThrow();
    expect(() => validateTextInput('12345')).not.toThrow();
    expect(() => validateTextInput('a'.repeat(300))).not.toThrow();
  });

  it('throws error for missing/empty text', () => {
    expect(() => validateTextInput('')).toThrow('Request "text" field is missing or empty');
    expect(() => validateTextInput('   ')).toThrow('Request "text" field is missing or empty');
    expect(() => validateTextInput('\r')).toThrow('Request "text" field is missing or empty');
  });

  it('throws error for text under 5 characters in length', () => {
    expect(() => validateTextInput('abc')).toThrow('Request "text" field must be at least 5 characters long');
  });

  it('throws error for text over 300 characters in length', () => {
    const longText = 'a'.repeat(301);
    expect(() => validateTextInput(longText)).toThrow('Request "text" field must not exceed 300 characters');
  });
});

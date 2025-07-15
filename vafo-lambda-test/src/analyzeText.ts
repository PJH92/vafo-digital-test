export interface TextAnalysisResult {
    wordCount: number;
    characterCount: number;
    lineCount: number;
    longestWordLength: number;
    mostCommonLetter: string | null;
}

export function analyzeText(text: string): TextAnalysisResult {
    if (typeof text !== 'string' || text.trim() === '') {
        throw new Error('Request "text" field is missing or empty ');
    }
    if (text.length < 5) {
        throw new Error('Request "text" field must be at least 5 characters long');
    }
    if (text.length > 300) {
        throw new Error('Request "text" field must not exceed 300 characters');
    }

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characterCount = text.replace(/\s+/g, '').length;
    const lineCount = text.split(/\r\n|\r|\n/).length;
    const longestWordLength = text
        .split(/\s+/)
        .reduce((max, word) => Math.max(max, word.length), 0);
    const mostCommonLetter = getMostCommonLetter(text);

    return {
        wordCount,
        characterCount,
        lineCount,
        longestWordLength,
        mostCommonLetter,
    };
}

function getMostCommonLetter(text: string): string | null {
    const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, '');
    if (!lettersOnly) return null;

    const frequencyMap: Record<string, number> = {};
    for (const char of lettersOnly) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    return Object.entries(frequencyMap).reduce(
        (mostCommon, [letter, count]) =>
            count > mostCommon[1] ? [letter, count] : mostCommon,
        ['', 0]
    )[0] || null;
}

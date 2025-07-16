export interface TextAnalysisResult {
    wordCount: number;
    characterCount: number;
    lineCount: number;
    longestWordLength: number;
    mostCommonLetter: string | null;
}

export function analyzeText(text: string): TextAnalysisResult {
    // Validate the input text
    validateTextInput(text);

    // Calculate word count
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    // Calculate character count
    const characterCount = text.replace(/\s+/g, '').length;
    // Calculate line count
    const lineCount = text.split(/\r\n|\r|\n/).length;
    // Calculate longest word length
    const longestWordLength = text
        .split(/\s+/)
        .reduce((max, word) => Math.max(max, word.length), 0);
    // Calculate most common letter
    const mostCommonLetter = getMostCommonLetter(text);

    // Return the analysis results
    return {
        wordCount,
        characterCount,
        lineCount,
        longestWordLength,
        mostCommonLetter,
    };
}

export function validateTextInput(text: string): void {
    // Reject empty strings
    if (typeof text !== 'string' || text.replace(/\s+/g, '') === '') {
        throw new Error('Request "text" field is missing or empty ');
    }
    // Reject strings less than 5 characters
    if (text.length < 5) {
        throw new Error('Request "text" field must be at least 5 characters long');
    }
    // Reject strings longer than 300 characters
    if (text.length > 300) {
        throw new Error('Request "text" field must not exceed 300 characters');
    }
}

function getMostCommonLetter(text: string): string | null {
    // Remove non-letter characters and convert to lowercase
    const lettersOnly = text.toLowerCase().replace(/[^a-z]/g, '');
    // If no letters are present, return null
    if (!lettersOnly) return null;

    // Create frequency map of letters
    const frequencyMap: Record<string, number> = {};
    for (const char of lettersOnly) {
        frequencyMap[char] = (frequencyMap[char] || 0) + 1;
    }

    // Find the letter with the highest frequency
    return Object.entries(frequencyMap).reduce(
        (mostCommon, [letter, count]) =>
            count > mostCommon[1] ? [letter, count] : mostCommon,
        ['', 0]
    )[0] || null;
}
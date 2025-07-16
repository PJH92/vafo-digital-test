import { APIGatewayProxyHandler } from 'aws-lambda';
import { analyzeText } from './analyzeText';

export const textAnalyzer: APIGatewayProxyHandler = async (event) => {
    try {
        // Parse the request body
        let body: any;
        try {
            body = JSON.parse(event.body || '{}');
        } catch (jsonErr) {
            // If the request body is not valid JSON, throw an error
            throw new Error('Invalid JSON input');
        }

        const text: string | undefined = body.text;

        // Analyze the text
        const result = analyzeText(text || '');

        // Return the analysis results
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
    } catch (err: any) {
        // If an error occurs, log the error and return a 400 status code
        console.error("Error:", err.message);
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }),
        };
    }
};

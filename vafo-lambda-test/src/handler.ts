import { APIGatewayProxyHandler } from 'aws-lambda';
import { analyzeText } from './analyzeText';

export const textAnalyzer: APIGatewayProxyHandler = async (event) => {
    try {
        let body: any;
        try {
            body = JSON.parse(event.body || '{}');
        } catch (jsonErr) {
            throw new Error('Invalid JSON input');
        }

        const text: string | undefined = body.text;

        const result = analyzeText(text || '');
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
    } catch (err: any) {
        console.error("Error:", err.message);
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message }),
        };
    }
};

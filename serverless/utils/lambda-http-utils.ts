import { APIGatewayProxyResult } from "aws-lambda";

// Handy response functions
export const ok = (body = null) => respond(200, body);

export const internalError = (body = null) => respond(500, body);

export const badRequest = (body = null) => respond(400, body);

function respond(statusCode: number, body: any = null): APIGatewayProxyResult {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
}
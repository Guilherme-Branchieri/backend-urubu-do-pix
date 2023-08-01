import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod/lib/ZodError";
export const app = express();

app.use((error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        console.error(error.message);
        return response.status(400).send({ message: 'Validation Error', issues: error.format() })
    }

    return response.status(500).send({ message: "Internal Server Error", })
})


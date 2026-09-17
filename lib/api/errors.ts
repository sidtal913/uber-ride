import { ZodError } from "zod";

export function validationErrorResponse(error: ZodError): Response {
  return Response.json(
    {
      error: "validation_error",
      message: "Request validation failed",
      details: error.errors.map((e) => ({
        path: e.path.join(".") || "(root)",
        message: e.message,
      })),
    },
    { status: 422 },
  );
}

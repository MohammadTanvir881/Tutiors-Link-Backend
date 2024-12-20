import { ZodError } from "zod";
import { ErrorRequestHandler } from "express";
import { TErrorSource } from "../Error/interface/error";
import config from "../config";
import handleZodError from "../Error/zodValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 400;
  let message = "Validation Error";
  let errorSource: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handleZodError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorSource = simplifyError.errorSource;
  }

  return res.status(statusCode).json({
    status: false,
    message,
    errorSource,
    err,
    stack: config.node_env === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;

import { NextFunction, Response, Request } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exception.filter.interface";
import { HttpErrorClass } from "./http-error.class";


export class ExceptionFilter implements IExceptionFilter {
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  catch(error: Error | HttpErrorClass, request: Request, response: Response, next: NextFunction): void {
    if (error instanceof HttpErrorClass) {
      this.logger.error(`${error.context} Ошибка ${error.statusCode}: ${error.message}`);
      response.status(error.statusCode).send({ err: error.message });

      return;
    }

    this.logger.error(`${error.message}`);
    response.status(500).send({ err: error.message });
  }

}

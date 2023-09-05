import { NextFunction, Response, Request } from "express";
import { IExceptionFilter } from "./exception.filter.interface";
import { HttpErrorClass } from "./http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

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

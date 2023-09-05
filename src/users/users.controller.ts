import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { NextFunction, Request, Response } from "express";
import { HttpErrorClass } from "../errors/http-error.class";

export class UsersController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      {path: '/register', method: 'post', function: this.register},
      {path: '/login', method: 'post', function: this.login},
    ])
  }

  login(request: Request, response: Response, next: NextFunction) {
    next(new HttpErrorClass(401, 'Ошибка авторизаци', 'login'))
  }

  register(request: Request, response: Response, next: NextFunction) {

    this.ok(response, 'register')
  }

}

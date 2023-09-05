import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorClass } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', function: this.register },
			{ path: '/login', method: 'post', function: this.login }
		]);
	}

	login(request: Request, response: Response, next: NextFunction) {
		next(new HttpErrorClass(401, 'Ошибка авторизаци', 'login'));
	}

	register(request: Request, response: Response, next: NextFunction) {
		this.ok(response, 'register');
	}
}

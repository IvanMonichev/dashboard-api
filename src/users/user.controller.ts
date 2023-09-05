import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorClass } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUserController } from './user.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', function: this.register },
			{ path: '/login', method: 'post', function: this.login }
		]);
	}

	login(request: Request<{}, {}, UserLoginDto>, response: Response, next: NextFunction): void {
		console.log(request.body);
		next(new HttpErrorClass(401, 'Ошибка авторизации', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HttpErrorClass(422, 'Такой пользователь уже существует'));
		}

		this.ok(response, { email: result.email });
	}
}

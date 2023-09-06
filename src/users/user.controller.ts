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
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './user.service.interface';
import { AuthGuard } from '../common/auth.guard';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				function: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)]
			},
			{
				path: '/login',
				method: 'post',
				function: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)]
			},
			{
				path: '/info',
				method: 'get',
				function: this.info,
				middlewares: [new AuthGuard()]
			}
		]);
	}

	async login(
		request: Request<{}, {}, UserLoginDto>,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const result = await this.userService.validateUser(request.body);
		if (!result) {
			return next(new HttpErrorClass(401, 'Ошибка авторизации', 'login'));
		}
		const jwt = await this.signJwt(request.body.email, this.configService.get('SECRET'));
		this.ok(response, { jwt });
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

		this.ok(response, { email: result.email, id: result.id });
	}

	private async signJwt(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(email, secret, { algorithm: 'HS256' }, (err, token) => {
				if (err) {
					reject(err);
				}
				resolve(token as string);
			});
		});
	}

	async info(
		{ user }: Request<{}, {}, UserRegisterDto>,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const userInfo = await this.userService.getUserInfo(user);
		this.ok(response, { email: userInfo?.email, id: userInfo?.id });
	}
}

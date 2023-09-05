import { Response, Router } from 'express';
import { ExpressReturnType, IContollerRoute } from './controller-route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(response: Response, code: number, message: T): ExpressReturnType {
		response.type('application/json');
		return response.status(code).json(message);
	}

	public ok<T>(response: Response, message: T): void {
		this.send<T>(response, 200, message);
	}

	public created(response: Response): ExpressReturnType {
		return response.status(201);
	}

	protected bindRoutes(routes: IContollerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const handler = route.function.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}

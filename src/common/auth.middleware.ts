import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(request: Request, response: Response, next: NextFunction): void {
		const authorization = request.headers.authorization;
		if (authorization) {
			const token = authorization.split(' ')[1];
			verify(token, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					request.user = payload as string;
					next();
				}
			});
		} else {
			next();
		}
	}
}

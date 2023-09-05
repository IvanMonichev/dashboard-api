import { Response, Router } from "express";
import { IContollerRoute } from "./controller-route.interface";
import { ILogger } from "../logger/logger.interface";
import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(response: Response, code: number, message: T) {
    response.type('application/json')
    return response.status(code).json(message)
  }

  public ok<T>(response: Response, message: T) {
    this.send<T>(response, 200, message)
  }

  public created(response: Response) {
    return response.status(201);
  }

  protected bindRoutes(routes: IContollerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const handler = route.function.bind(this);
      this.router[route.method](route.path, handler)
    }
  }
}

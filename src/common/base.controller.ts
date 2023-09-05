import { LoggerService } from "../logger/logger.service";
import { Response, Router } from "express";
import { IContollerRoute } from "./controller-route.interface";

export abstract class BaseController {
  private readonly _router: Router;
  protected constructor(private logger: LoggerService) {
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

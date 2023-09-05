import { NextFunction, Request, Response, Router } from "express";

export interface IContollerRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  function: (request: Request, response: Response, next: NextFunction) => void;
}

import { ILogObj, Logger } from "tslog";

export class LoggerService {
  private logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger<ILogObj>({
      hideLogPositionForProduction: true,
    })
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }
}

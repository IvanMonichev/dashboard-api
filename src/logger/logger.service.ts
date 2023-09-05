import { injectable } from 'inversify';
import { ILogObj, Logger } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger<ILogObj>({
			hideLogPositionForProduction: false
		});
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

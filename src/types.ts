import { UserRepository } from './users/user.repository';

export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	UsersController: Symbol.for('UserController'),
	ExceptionFilter: Symbol.for('ExceptionFilter'),
	UserService: Symbol.for('UserService'),
	ConfigService: Symbol.for('ConfigService'),
	PrismaService: Symbol.for('PrismaService'),
	UserRepository: Symbol.for('UserRepository')
};

import { Inject } from "@nestjs/common";

export const LoggerRepositoryToken = 'LoggerRepository'

export const InjectLoggerRepository = () => Inject(LoggerRepositoryToken);
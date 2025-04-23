import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { LoggerRepository } from "../../repository/logger.repository";
import { ReadLoggerQuery, ReadLoggerQueryPayload } from "../read-logger.query";

describe("ReadLoggerQuery", () => {
    let repository: jest.Mocked<LoggerRepository>;
    let query: ReadLoggerQuery;

    beforeEach(() => {
        repository = {
            read: jest.fn(),
            countAsync: jest.fn(),
        } as unknown as jest.Mocked<LoggerRepository>;

        query = new ReadLoggerQuery(repository);
    });

    it("should return a list of logger with pagination and ordering", async () => {
        const payload: ReadLoggerQueryPayload = {
            limit: 100,
            skip: 0,
        };
        const mockedLogger: LoggerModel[] = [{ id: "logger-1" }, { id: "logger-2" }] as unknown as LoggerModel[];

        repository.read.mockResolvedValue(mockedLogger);
        repository.countAsync.mockResolvedValue(mockedLogger.length);

        const result = await query.handleAsync(payload);

        expect(repository.read).toHaveBeenCalledWith({
            ...payload,
            filter: []
        });
        expect(result).toEqual({ data: mockedLogger, amount: mockedLogger.length });
    });

    it("should return a list of logger with a level, pagination and ordering", async () => {
        const payload: ReadLoggerQueryPayload = {
            limit: 100,
            skip: 0,
            level: 'warn'
        };
        const mockedLogger: LoggerModel[] = [{ id: "logger-1" }, { id: "logger-2" }] as unknown as LoggerModel[];

        repository.read.mockResolvedValue(mockedLogger);
        repository.countAsync.mockResolvedValue(mockedLogger.length);

        const result = await query.handleAsync(payload);

        expect(repository.read).toHaveBeenCalledWith({
            ...payload,
            filter: [{ field: 'level', operator: 'eq', value: payload.level }]
        });
        expect(result).toEqual({ data: mockedLogger, amount: mockedLogger.length });
    });

    it("should return an empty array when no logger are found", async () => {
        const payload: ReadLoggerQueryPayload = {
            limit: 100,
            skip: 0,
        };
        repository.read.mockResolvedValue([]);
        repository.countAsync.mockResolvedValue(0);

        const result = await query.handleAsync(payload);

        expect(repository.read).toHaveBeenCalledWith({
            ...payload,
            filter: []
        });
        expect(result).toEqual({ data: [], amount: 0 });
    });
});
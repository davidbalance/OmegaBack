import { LoggerLevelModel } from "@db-logger/db-logger/core/model/logger-level.model";
import { LoggerRepository } from "../../repository/logger.repository";
import { ReadLoggerLevelsQuery } from "../read-logger-levels.query";

describe("ReadLoggerLevelsQuery", () => {
    let repository: jest.Mocked<LoggerRepository>;
    let query: ReadLoggerLevelsQuery;

    beforeEach(() => {
        repository = {
            retriveLevels: jest.fn(),
        } as unknown as jest.Mocked<LoggerRepository>;

        query = new ReadLoggerLevelsQuery(repository);
    });

    it("should return a list of logger levels", async () => {
        const mockedLogger: LoggerLevelModel[] = [{ id: "logger-1" }, { id: "logger-2" }] as unknown as LoggerLevelModel[];

        repository.retriveLevels.mockResolvedValue(mockedLogger);

        const result = await query.handleAsync();

        expect(repository.retriveLevels).toHaveBeenCalledWith();
        expect(result).toEqual(mockedLogger);
    });

    it("should return an empty array when no logger levels are found", async () => {
        repository.retriveLevels.mockResolvedValue([]);

        const result = await query.handleAsync();

        expect(repository.retriveLevels).toHaveBeenCalledWith();
        expect(result).toEqual([]);
    });
});
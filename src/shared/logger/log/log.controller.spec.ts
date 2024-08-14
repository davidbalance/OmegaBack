import { TestBed } from "@automock/jest";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";
import { GetLogLevelArrayResponseDto, GetLogLevelResponseDto, GetLogsResponseDto } from "./dtos/log.response.dto";
import { PostLogRequestDto } from "./dtos/log.request.dto";
import { Log } from "./entities/log.entity";

describe('LogController', () => {
    let controller: LogController;
    let service: jest.Mocked<LogService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(LogController).compile();

        controller = unit;
        service = unitRef.get(LogService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findLevels', () => {
        const mockLevels: GetLogLevelResponseDto[] = [{ level: 'info' }];
        const expectResult: GetLogLevelArrayResponseDto = { levels: mockLevels };

        it('should call LogService.findLevels and return the response', async () => {
            // Arrange
            service.findLevels.mockResolvedValueOnce(mockLevels);

            // Act
            const result = await controller.findLevels();

            // Assert
            expect(service.findLevels).toHaveBeenCalled();
            expect(result).toEqual(expectResult);
        });
    });

    describe('findLogs', () => {
        const mockBody: PostLogRequestDto = {
            level: 'info',
            from: new Date(),
            to: new Date(),
        };
        const mockLogs: Log[] = [{ id: 1, level: "info", message: "my-log", timestamp: new Date(), createAt: new Date(), updateAt: new Date() }];
        const mockResponse: GetLogsResponseDto = { logs: mockLogs };

        it('should call LogService.find and return the response', async () => {
            // Arrange
            service.find.mockResolvedValueOnce(mockLogs);

            // Act
            const result = await controller.findLogs(mockBody);

            // Assert
            expect(result).toEqual(mockResponse);
            expect(service.find).toHaveBeenCalledWith(mockBody);
        });
    });
});
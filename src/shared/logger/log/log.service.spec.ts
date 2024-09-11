/* import { TestBed } from "@automock/jest";
import { LogRepository } from "./log.repository";
import { LogService } from "./log.service";
import { PostLogRequestDto } from "./dtos/log.request.dto";
import { Log } from "./entities/log.entity";
import { Between, FindOperator } from "typeorm"; */

import { TestBed } from "@automock/jest";
import { LogService } from "./log.service";

describe('LogService', () => {
    let service: LogService;

    beforeEach(async () => {
        const { unit } = TestBed.create(LogService).compile();
        service = unit;
    });

    it('', () => {
        expect(service).toBeDefined();
    })
    /* let repository: jest.Mocked<LogRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(LogService).compile();

        service = unit;
        repository = unitRef.get(LogRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('findLevels', () => {
        const mockLevels: { level: string }[] = [{ level: 'info' }];

        beforeEach(() => {
            repository.query.mockReturnValue({
                select: jest.fn().mockReturnThis(),
                distinct: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValueOnce(mockLevels),
            } as any);
        });

        it('should call LogRepository.query and return the distinct log levels', async () => {
            // Arrange
            // Act
            const result = await service.findLevels();

            // Assert
            expect(repository.query).toHaveBeenCalledWith('log');
            expect(repository.query().select).toHaveBeenCalledWith('log.log_level', 'level');
            expect(repository.query().distinct).toHaveBeenCalledWith(true);
            expect(repository.query().getRawMany).toHaveBeenCalled();
            expect(result).toEqual(mockLevels);
        });
    });

    describe('find', () => {
        const mockBody: PostLogRequestDto = {
            level: 'info',
            from: new Date('2000-01-01'),
            to: new Date('2000-01-02'),
        };
        const mockLogs: Log[] = [
            { id: 1, level: 'info', message: 'my-log', timestamp: new Date(), createAt: new Date(), updateAt: new Date() },
        ];

        it('should call LogRepository.find with the correct parameters and return the logs', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockLogs);

            // Act
            const result = await service.find(mockBody);

            // Assert
            expect(repository.find).toHaveBeenCalledWith({
                order: { timestamp: 'desc' },
                where: {
                    timestamp: Between(mockBody.from, mockBody.to),
                    level: mockBody.level,
                },
            });
            expect(result).toEqual(mockLogs);
        });

        it('should use default from and to dates if not provided', async () => {
            // Arrange
            repository.find.mockResolvedValueOnce(mockLogs);

            // Act
            const result = await service.find({});

            // Assert
            expect(repository.find).toHaveBeenCalledWith({
                order: { timestamp: 'desc' },
                where: {
                    timestamp: expect.any(FindOperator),
                    level: undefined,
                },
            });
            expect(result).toEqual(mockLogs);
        });
    });

    describe('write', () => {
        const mockInfo = {
            level: 'info',
            message: 'my-log',
            timestamp: new Date(),
        };

        it('should call LogRepository.create with the correct log data', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(undefined);

            // Act
            await service.write(mockInfo);

            // Assert
            expect(repository.create).toHaveBeenCalledWith({
                level: mockInfo.level.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, ''),
                message: mockInfo.message.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '').trimStart(),
                timestamp: mockInfo.timestamp,
            });
        });
    });
 */
});
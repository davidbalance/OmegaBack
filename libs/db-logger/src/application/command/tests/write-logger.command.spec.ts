/* eslint-disable @typescript-eslint/unbound-method */
import { LoggerRepository } from "../../repository/logger.repository";
import { WriteLoggerCommand, WriteLoggerCommandPayload } from "../write-logger.command";

describe('WriteCommand', () => {
    let handler: WriteLoggerCommand;
    let repository: jest.Mocked<LoggerRepository>;

    beforeEach(() => {
        repository = {
            write: jest.fn(),
        } as unknown as jest.Mocked<LoggerRepository>;
        handler = new WriteLoggerCommand(repository);
    });

    it('should handle the command and save the logger asynchronously', async () => {
        const payload: WriteLoggerCommandPayload = {
            message: 'Test log message',
            level: 'info',
            timestamp: new Date('2025-02-20T12:00:00Z')
        };

        await handler.handleAsync(payload);

        expect(repository.write).toHaveBeenCalledWith(expect.objectContaining({
            message: 'Test log message',
            level: 'info',
            timestamp: new Date('2025-02-20T12:00:00Z')
        }));
    });
});

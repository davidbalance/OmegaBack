import { Logger } from "../logger.domain";

describe('Logger Entity', () => {
    let logger: Logger;

    beforeEach(() => {
        logger = Logger.create({
            message: 'Test message',
            level: 'info',
            timestamp: new Date('2025-02-20T12:00:00Z')
        });
    });

    it('should get the correct initial state', () => {
        expect(logger.message).toEqual('Test message');
        expect(logger.level).toEqual('info');
        expect(logger.timestamp).toEqual(new Date('2025-02-20T12:00:00Z'));
    });

    it('should create a logger with a unique ID', () => {
        const logger2 = Logger.create({
            message: 'Another message',
            level: 'error',
            timestamp: new Date('2025-02-20T12:00:00Z')
        });
        expect(logger.id).not.toEqual(logger2.id);
    });

    it('should rehydrate', () => {
        const loggerId = crypto.randomUUID();
        const rehydrated = Logger.rehydrate({
            id: loggerId,
            level: 'error',
            message: 'Test error message',
            timestamp: new Date('2025-02-20T12:00:00Z')
        });

        expect(rehydrated.id).toEqual(loggerId);
        expect(rehydrated.level).toEqual('error');
        expect(rehydrated.message).toEqual('Test error message');
        expect(rehydrated.timestamp).toEqual(new Date('2025-02-20T12:00:00Z'));

    });
});
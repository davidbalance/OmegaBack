import { Logger as LocalLogger } from "@db-logger/db-logger/core/domain/logger.domain";
import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { Prisma, Logger as PrismaLogger } from "@prisma/client";
import { LoggerDomainMapper } from "../logger.domain-mapper";

describe('LoggerDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Area domain object to a Prisma input', () => {

            const timestamp = new Date();
            const domainObj: LocalLogger = {
                id: 'id-123',
                level: 'error',
                message: 'Test messsage',
                timestamp: timestamp,
            } as unknown as LocalLogger;

            const expected: Prisma.LoggerUncheckedCreateInput = {
                id: 'id-123',
                level: 'error',
                message: 'Test messsage',
                timestamp: timestamp,
            }

            const result = LoggerDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: LocalLogger = {
                id: 'id-123',
                level: 'error',
                message: 'Test messsage',
                timestamp: new Date()
            } as unknown as LocalLogger;

            const result = LoggerDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.level).toBe(domainObj.level);
            expect(result.message).toBe(domainObj.message);
            expect(result.timestamp).toBe(domainObj.timestamp);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the LoggerModel domain', () => {
            const prismaObj: PrismaLogger = {
                id: 'id-123',
                level: 'error',
                message: 'Test messsage',
                timestamp: new Date()
            };

            const expectedDomainObj = new LoggerModel({ ...prismaObj });

            const result = LoggerDomainMapper.toDomain(prismaObj);

            expect(result.level).toBe(expectedDomainObj.level);
            expect(result.message).toBe(expectedDomainObj.message);
            expect(result.timestamp).toBe(expectedDomainObj.timestamp);
        });
    });
});
import { Record } from "@omega/medical/core/domain/client/record.domain";
import { MedicalRecord as PrismaRecord, Prisma } from "@prisma/client";
import { RecordDomainMapper } from "../record.domain-mapper";

describe('RecordDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Record domain object to a Prisma input', () => {
            const timestamp = new Date();
            const domainObj: Record = {
                id: 'id-123',
                filepath: '/path/to/file',
                name: 'Test-Record',
                createAt: timestamp,
                clientId: 'client-123',
            } as unknown as Record;

            const expected: Prisma.MedicalRecordUncheckedCreateInput = {
                id: 'id-123',
                filepath: '/path/to/file',
                name: 'Test-Record',
                createdAt: timestamp,
                clientId: 'client-123',
            }

            const result = RecordDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Record = {
                id: 'id-123',
                filepath: '/path/to/file',
                name: 'Test-Record',
                createAt: new Date(),
                clientId: 'client-123',
            } as unknown as Record;

            const result = RecordDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.filepath).toBe(domainObj.filepath);
            expect(result.name).toBe(domainObj.name);
            expect(result.createdAt).toBe(domainObj.createAt);
            expect(result.clientId).toBe(domainObj.clientId);
        });

        it('should rename "createAt" to "createdAt"', () => {
            const domainObj: Record = {
                id: 'id-123',
                filepath: '/path/to/file',
                name: 'Test-Record',
                createAt: new Date(),
                clientId: 'client-123',
            } as unknown as Record;

            const result = RecordDomainMapper.toPrisma(domainObj);

            expect(result.createdAt).toBe(domainObj.createAt);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Record domain', () => {
            const prismaObj: PrismaRecord = {
                id: 'id-123',
                filepath: '/path/to/file',
                name: 'Test-Record',
                createdAt: new Date(),
                clientId: 'client-123',
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Record;
            jest.spyOn(Record, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = RecordDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});
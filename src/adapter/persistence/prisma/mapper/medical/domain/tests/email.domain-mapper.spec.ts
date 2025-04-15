import { Email } from "@omega/medical/core/domain/client/email.domain";
import { MedicalEmail as PrismaEmail, Prisma } from "@prisma/client";
import { EmailDomainMapper } from "../email.domain-mapper";

describe('EmailDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Email domain object to a Prisma input', () => {
            const domainObj: Email = {
                id: 'id-123',
                clientId: 'client-id',
                email: 'test@email.com',
            } as unknown as Email;

            const expected: Prisma.MedicalEmailUncheckedCreateInput = {
                id: 'id-123',
                clientId: 'client-id',
                email: 'test@email.com',
            }

            const result = EmailDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Email = {
                id: 'id-123',
                clientId: 'client-id',
                email: 'test@email.com',
            } as unknown as Email;

            const result = EmailDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.clientId).toBe(domainObj.clientId);
            expect(result.email).toBe(domainObj.email);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Email domain', () => {
            const prismaObj: PrismaEmail = {
                id: 'id-123',
                clientId: 'client-id',
                email: 'test@email.com',
            } as PrismaEmail;

            const expectedDomainObj = { test: 'domain' } as unknown as Email;
            jest.spyOn(Email, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = EmailDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});
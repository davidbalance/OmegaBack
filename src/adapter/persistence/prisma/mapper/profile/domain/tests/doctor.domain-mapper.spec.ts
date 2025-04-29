import { Doctor } from "@omega/profile/core/domain/user/doctor.domain";
import { Doctor as PrismaDoctor, Prisma } from "@prisma/client";
import { DoctorDomainMapper } from "../doctor.domain-mapper";

describe('DoctorDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Doctor domain object to a Prisma input', () => {
            const domainObj: Doctor = {
                id: 'disease-123',
                signature: 'Doctor Signature',
                userId: 'user-123',
            } as unknown as Doctor;

            const expected: Prisma.DoctorUncheckedCreateInput = {
                id: 'disease-123',
                signature: 'Doctor Signature',
                userId: 'user-123',
            }

            const result = DoctorDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Doctor = {
                id: 'disease-123',
                signature: 'Doctor Signature',
                userId: 'user-123',
            } as unknown as Doctor;

            const result = DoctorDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.signature).toBe(domainObj.signature);
            expect(result.userId).toBe(domainObj.userId);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Doctor domain', () => {
            const prismaObj: PrismaDoctor = {
                id: 'disease-123',
                signature: 'Doctor Signature',
                userId: 'user-123',
                hasFile: true,
                createdAt: new Date(),
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Doctor;
            jest.spyOn(Doctor, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = DoctorDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});
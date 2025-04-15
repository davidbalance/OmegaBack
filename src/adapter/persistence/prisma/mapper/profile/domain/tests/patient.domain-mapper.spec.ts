import { Patient } from "@omega/profile/core/domain/user/patient.domain";
import { Patient as PrismaPatient, Prisma } from "@prisma/client";
import { PatientDomainMapper } from "../patient.domain-mapper";

describe('PatientDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Patient domain object to a Prisma input', () => {
            const domainObj: Patient = {
                id: 'patient-123',
                userId: 'patient-123',
                birthday: new Date()
            } as unknown as Patient;

            const expected: Prisma.PatientUncheckedCreateInput = {
                id: 'patient-123',
                userId: 'patient-123',
                birthday: new Date()
            }

            const result = PatientDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should preserve the values during mapping', () => {
            const domainObj: Patient = {
                id: 'patient-123',
                userId: 'patient-123',
                birthday: new Date()
            } as unknown as Patient;

            const result = PatientDomainMapper.toPrisma(domainObj);

            expect(result.userId).toBe(domainObj.userId);
            expect(result.birthday).toBe(domainObj.birthday);
        });
    });

    describe('toDomain', () => {
        it('should correctly map a Prisma API key object to the Patient domain', () => {
            const prismaObj: PrismaPatient = {
                id: 'patient-123',
                birthday: new Date(),
                gender: 'male',
                userId: 'user-123',
                createdAt: new Date(),
                updatedAt: null
            };

            const expectedDomainObj = { test: 'domain' } as unknown as Patient;
            jest.spyOn(Patient, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = PatientDomainMapper.toDomain(prismaObj);

            expect(result).toBe(expectedDomainObj);
        });
    });
});
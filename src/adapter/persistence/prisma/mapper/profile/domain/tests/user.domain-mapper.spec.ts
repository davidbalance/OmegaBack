import { User } from "@omega/profile/core/domain/user/user.domain";
import { User as PrismaUser, Patient as PrismaPatient, Doctor as PrismaDoctor, Attribute as PrismaAttribute, Prisma, $Enums } from "@prisma/client";
import { PrismaUserWithAttributesAndDoctorAndPatient, UserDomainMapper } from "../user.domain-mapper";
import { Doctor } from "@omega/profile/core/domain/user/doctor.domain";
import { Patient } from "@omega/profile/core/domain/user/patient.domain";
import { DoctorDomainMapper } from "../doctor.domain-mapper";
import { PatientDomainMapper } from "../patient.domain-mapper";

describe('UserDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an User domain object to Prisma input', () => {
            const domainObj: User = {
                id: 'user-123',
                dni: "1234567890",
                name: "Patient",
                lastname: "Lastname"
            } as unknown as User;

            const expected: Prisma.UserUncheckedCreateInput = {
                id: 'user-123',
                dni: "1234567890",
                name: "Patient",
                lastname: "Lastname"
            }

            const result = UserDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: User = {
                id: 'user-123',
                dni: "1234567890",
                name: "Patient",
                lastname: "Lastname"
            } as unknown as User;

            const result = UserDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.dni).toBe(domainObj.dni);
            expect(result.name).toBe(domainObj.name);
            expect(result.lastname).toBe(domainObj.lastname);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaUserWithAttributesAndDoctorAndPatient = {
            id: 'user-123',
            dni: "1234567890",
            name: "Patient",
            lastname: "Lastname",
            auth: 'auth-code',
            email: 'test@email.com',
            isActive: true,
            attributes: [{ id: 'attribute-123' }] as unknown as PrismaAttribute[],
            doctor: { id: 'doctor-123' } as unknown as PrismaDoctor,
            patient: { id: 'patient-123' } as unknown as PrismaPatient,
            createdAt: new Date(),
            updatedAt: null
        };

        let spyDoctorDomainMapper: jest.SpyInstance<Doctor, [value: { id: string; createdAt: Date; updatedAt: Date | null; userId: string; signature: string; hasFile: boolean; }], any>;
        let spyPatientDomainMapper: jest.SpyInstance<Patient, [value: { id: string; createdAt: Date; updatedAt: Date | null; userId: string; birthday: Date; gender: $Enums.PatientGender; }], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyDoctorDomainMapper = jest.spyOn(DoctorDomainMapper, 'toDomain').mockReturnValue({ mapped: 'apikey' } as unknown as Doctor);
            spyPatientDomainMapper = jest.spyOn(PatientDomainMapper, 'toDomain').mockReturnValue({ mapped: 'token' } as unknown as Patient);
        });

        it('should correctly map a PrismaUserWithAttributesAndDoctorAndPatient to an User domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as User;
            jest.spyOn(User, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = UserDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map apikeys using DoctorDomainMapper', () => {
            UserDomainMapper.toDomain(basePrismaObj);
            expect(spyDoctorDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyDoctorDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.doctor });
        });

        it('should map token using PatientDomainMapper when token is present', () => {
            UserDomainMapper.toDomain(basePrismaObj);
            expect(spyPatientDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.patient });
        });
    });
});
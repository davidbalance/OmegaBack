import { Client } from "@omega/medical/core/domain/client/client.domain";
import { MedicalEmail as PrismaEmail, MedicalRecord as PrismaMedicalRecord, Prisma } from "@prisma/client";
import { ClientDomainMapper, MedicalClientWithEmailAndRecords } from "../client.domain-mapper";
import { Record } from "@omega/medical/core/domain/client/record.domain";
import { Email } from "@omega/medical/core/domain/client/email.domain";
import { EmailDomainMapper } from "../email.domain-mapper";
import { RecordDomainMapper } from "../record.domain-mapper";

describe('ClientDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Client domain object to Prisma input', () => {
            const patientBirthday = new Date();

            const domainObj: Client = {
                id: 'client-123',
                patientDni: '0123456789',
                patientName: 'Patient',
                patientLastname: 'Lastname',
                patientGender: 'male',
                patientRole: 'sample-role',
                patientBirthday: patientBirthday,
                areaId: 'area-123',
                areaName: 'Area',
                jobPosition: 'Job Position',
                managementId: 'management-123',
                managementName: 'Management',
            } as unknown as Client;

            const expected: Prisma.MedicalClientUncheckedCreateInput = {
                id: 'client-123',
                patientDni: '0123456789',
                patientName: 'Patient',
                patientLastname: 'Lastname',
                patientGender: 'male',
                patientRole: 'sample-role',
                patientBirthday: patientBirthday,
                jobPosition: 'Job Position',
            }

            const result = ClientDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Client = {
                id: 'client-123',
                patientDni: '0123456789',
                patientName: 'Patient',
                patientLastname: 'Lastname',
                patientGender: 'male',
                patientRole: 'sample-role',
                patientBirthday: new Date(),
                areaId: 'area-123',
                areaName: 'Area',
                jobPosition: 'Job Position',
                managementId: 'management-123',
                managementName: 'Management',
            } as unknown as Client;

            const result = ClientDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.patientDni).toBe(domainObj.patientDni);
            expect(result.patientName).toBe(domainObj.patientName);
            expect(result.patientLastname).toBe(domainObj.patientLastname);
            expect(result.patientGender).toBe(domainObj.patientGender);
            expect(result.patientRole).toBe(domainObj.patientRole);
            expect(result.patientBirthday).toBe(domainObj.patientBirthday);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: MedicalClientWithEmailAndRecords = {
            id: 'client-123',
            patientDni: '0123456789',
            patientName: 'Patient',
            patientLastname: 'Lastname',
            patientGender: 'male',
            patientRole: 'sample-role',
            patientBirthday: new Date(),
            areaId: 'area-123',
            areaName: 'Area',
            jobPosition: 'Job Position',
            managementId: 'management-123',
            managementName: 'Management',
            email: [{ id: 'email-123' }] as PrismaEmail[],
            records: [{ id: 'records-123' }] as PrismaMedicalRecord[],
        } as MedicalClientWithEmailAndRecords;

        let spyEmailDomainMapper: jest.SpyInstance<Email, [value: { default: boolean; id: string; createdAt: Date; updatedAt: Date | null; email: string; clientId: string; }], any>;
        let spyRecordDomainMapper: jest.SpyInstance<Record, [value: { name: string; id: string; createdAt: Date; updatedAt: Date | null; clientId: string; filepath: string; }], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyEmailDomainMapper = jest.spyOn(EmailDomainMapper, 'toDomain').mockReturnValue({ mapped: 'email' } as unknown as Email);
            spyRecordDomainMapper = jest.spyOn(RecordDomainMapper, 'toDomain').mockReturnValue({ mapped: 'record' } as unknown as Record);
        });

        it('should correctly map a MedicalClientWithEmailAndRecords to an Client domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Client;
            jest.spyOn(Client, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = ClientDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map emails using EmailDomainMapper', () => {
            ClientDomainMapper.toDomain(basePrismaObj);
            expect(spyEmailDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyEmailDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.email[0] });
        });

        it('should map records using RecordDomainMapper', () => {
            ClientDomainMapper.toDomain(basePrismaObj);
            expect(spyRecordDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.records[0] });
        });
    });
});
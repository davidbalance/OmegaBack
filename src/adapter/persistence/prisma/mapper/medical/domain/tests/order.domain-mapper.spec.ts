import { Order } from "@omega/medical/core/domain/order/order.domain";
import { OrderExternalKey } from "@omega/medical/core/domain/order/value-objects/order-external-key.value-object";
import { MedicalOrder as PrismaOrder, MedicalOrderExternalKey as PrismaExternalKey, Prisma } from "@prisma/client";
import { OrderDomainMapper, PrismaOrderExtended } from "../order.domain-mapper";
import { CreateOrderExternalKeyPayload } from "@omega/medical/core/domain/order/payloads/order-external-key.payloads";

describe('OrderDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Order domain object to Prisma input', () => {
            const domainObj: Order = {
                id: 'exam-type-123',
                patientId: 'client-123',
                process: 'Post-Ocupacional',
                year: 2025,
                doctor: {
                    dni: '1234567890',
                    fullname: 'Doctor',
                    signature: 'Doctor Signature',
                },
                location: {
                    branchName: 'Branch',
                    companyName: 'Company',
                    companyRuc: '1234567890001',
                    corporativeName: 'Corporative',
                },
            } as unknown as Order;

            const expected: Prisma.MedicalOrderUncheckedCreateInput = {
                id: 'exam-type-123',
                clientId: 'client-123',
                doctorDni: '1234567890',
                doctorFullname: 'Doctor',
                doctorSignature: 'Doctor Signature',
                locationBranchName: 'Branch',
                locationCompanyName: 'Company',
                locationCompanyRuc: '1234567890001',
                locationCorporativeName: 'Corporative',
                process: 'Post-Ocupacional',
                year: 2025,
            }

            const result = OrderDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Order = {
                id: 'exam-type-123',
                clientId: 'client-123',
                process: 'Post-Ocupacional',
                year: 2025,
                doctor: {
                    dni: '1234567890',
                    fullname: 'Doctor',
                    signature: 'Doctor Signature',
                },
                location: {
                    branchName: 'Branch',
                    companyName: 'Company',
                    companyRuc: '1234567890001',
                    corporativeName: 'Corporative',
                },
            } as unknown as Order;

            const result = OrderDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.year).toBe(domainObj.year);
            expect(result.process).toBe(domainObj.process);
            expect(result.clientId).toBe(domainObj.patientId);
            expect(result.doctorDni).toBe(domainObj.doctor.dni);
            expect(result.doctorFullname).toBe(domainObj.doctor.fullname);
            expect(result.doctorSignature).toBe(domainObj.doctor.signature);
            expect(result.locationCorporativeName).toBe(domainObj.location.corporativeName);
            expect(result.locationCompanyRuc).toBe(domainObj.location.companyRuc);
            expect(result.locationCompanyName).toBe(domainObj.location.companyName);
            expect(result.locationBranchName).toBe(domainObj.location.branchName);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaOrderExtended = {
            id: 'exam-type-123',
            clientId: 'client-123',
            doctorDni: '1234567890',
            doctorFullname: 'Doctor',
            doctorSignature: 'Doctor Signature',
            locationBranchName: 'Branch',
            locationCompanyName: 'Company',
            locationCompanyRuc: '1234567890001',
            locationCorporativeName: 'Corporative',
            process: 'Post-Ocupacional',
            year: 2025,
            createdAt: new Date(),
            email: true,
            isActive: true,
            status: 'created',
            updatedAt: null,
            externalKeys: [{ id: 'test-123' }] as unknown as PrismaExternalKey[]
        };

        let spyOrderExternalKeyCreate: jest.SpyInstance<OrderExternalKey, [props: CreateOrderExternalKeyPayload], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyOrderExternalKeyCreate = jest.spyOn(OrderExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as OrderExternalKey);
        });

        it('should correctly map a PrismaOrderExtended to an Order domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Order;
            jest.spyOn(Order, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = OrderDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should create external keys using OrderExternalKey when token is present', () => {
            OrderDomainMapper.toDomain(basePrismaObj);
            expect(spyOrderExternalKeyCreate).toHaveBeenCalledWith({ ...basePrismaObj.externalKeys[0] });
        });
    });
});
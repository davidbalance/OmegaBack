import { Prisma, CorporativeGroup as PrismaCorporativeGroup, CorporativeExternalKey as PrismaCorporativeExternalKey, } from "@prisma/client";
import { Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeExternalKey, CorporativeExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/corporative-external-key.value-object";
import { CorporativeDomainMapper, PrismaCorporativeExtended } from "../corporative.domain-mapper";
import { CompanyDomainMapper, PrismaCompanyExtended } from "../company.domain-mapper";
import { Company } from "@omega/location/core/domain/corporative/company.domain";

describe('CorporativeDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Corporative domain object to Prisma input', () => {
            const domainObj: Corporative = {
                id: 'id-123',
                name: 'Corporative',
            } as unknown as Corporative;

            const expected: Prisma.CorporativeGroupUncheckedCreateInput = {
                id: 'id-123',
                name: 'Corporative',
            }

            const result = CorporativeDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Corporative = {
                id: 'id-123',
                name: 'Corporative',
            } as unknown as Corporative;

            const result = CorporativeDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaCorporativeExtended = {
            id: "id-123",
            name: "Laboratory Test",
            createdAt: new Date(),
            isActive: true,
            updatedAt: null,
            companies: [{ id: 'exam-123' }] as unknown as PrismaCompanyExtended[],
            externalKeys: [{ subtypeId: 'type-id-123' }] as unknown as PrismaCorporativeExternalKey[]
        };

        let spyCompanyDomainMapper: jest.SpyInstance<Company, [value: PrismaCompanyExtended], any>;
        let spyCorporativeExternalKeyCreate: jest.SpyInstance<CorporativeExternalKey, [value: CorporativeExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyCompanyDomainMapper = jest.spyOn(CompanyDomainMapper, 'toDomain').mockReturnValue({ mapped: 'exam' } as unknown as Company);
            spyCorporativeExternalKeyCreate = jest.spyOn(CorporativeExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as CorporativeExternalKey);
        });

        it('should correctly map a PrismaCorporativeExtended to an Corporative domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Corporative;
            jest.spyOn(Corporative, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = CorporativeDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map companies using CompanyDomainMapper', () => {
            CorporativeDomainMapper.toDomain(basePrismaObj);
            expect(spyCompanyDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyCompanyDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.companies[0] });
        });

        it('should create external keys using CorporativeExternalKey when token is present', () => {
            CorporativeDomainMapper.toDomain(basePrismaObj);
            expect(spyCorporativeExternalKeyCreate).toHaveBeenCalledWith({ ...basePrismaObj.externalKeys[0] });
        });
    });
});
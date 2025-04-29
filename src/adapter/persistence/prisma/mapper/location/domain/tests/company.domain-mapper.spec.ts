import { Company } from "@omega/location/core/domain/corporative/company.domain";
import { CompanyExternalKey as PrismaCompanyExternalKey, Prisma } from "@prisma/client";
import { CompanyExternalKey, CompanyExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/company-external-key.value-object";
import { CompanyDomainMapper, PrismaCompanyExtended } from "../company.domain-mapper";
import { BranchDomainMapper, PrismaBranchExtended } from "../branch.domain-mapper";
import { Branch } from "@omega/location/core/domain/corporative/branch.domain";

describe('CompanyDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Company domain object to Prisma input', () => {
            const domainObj: Company = {
                id: 'id-123',
                name: 'Company',
                address: 'Address, Maple Stree 123',
                phone: '0999999999',
                ruc: '0123456789001',
                corporativeId: 'corporative-id',
            } as unknown as Company;

            const expected: Prisma.CompanyUncheckedCreateInput = {
                id: 'id-123',
                name: 'Company',
                address: 'Address, Maple Stree 123',
                phone: '0999999999',
                ruc: '0123456789001',
                corporativeId: 'corporative-id',
            }

            const result = CompanyDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Company = {
                id: 'id-123',
                name: 'Company',
                address: 'Address, Maple Stree 123',
                phone: '0999999999',
                ruc: '0123456789001',
                corporativeId: 'corporative-id',
            } as unknown as Company;

            const result = CompanyDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.address).toBe(domainObj.address);
            expect(result.phone).toBe(domainObj.phone);
            expect(result.ruc).toBe(domainObj.ruc);
            expect(result.corporativeId).toBe(domainObj.corporativeId);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaCompanyExtended = {
            id: "id-123",
            name: "Laboratory Test",
            address: 'Address, Maple Stree 123',
            phone: '0999999999',
            ruc: '0123456789001',
            createdAt: new Date(),
            isActive: true,
            corporativeId: 'type-123',
            updatedAt: null,
            branches: [{ id: 'exam-123' }] as unknown as PrismaBranchExtended[],
            externalKeys: [{ subtypeId: 'type-id-123' }] as unknown as PrismaCompanyExternalKey[]
        };

        let spyBranchDomainMapper: jest.SpyInstance<Branch, [value: PrismaBranchExtended], any>;
        let spyCompanyExternalKeyCreate: jest.SpyInstance<CompanyExternalKey, [value: CompanyExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyBranchDomainMapper = jest.spyOn(BranchDomainMapper, 'toDomain').mockReturnValue({ mapped: 'exam' } as unknown as Branch);
            spyCompanyExternalKeyCreate = jest.spyOn(CompanyExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as CompanyExternalKey);
        });

        it('should correctly map a PrismaCompanyExtended to an Company domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Company;
            jest.spyOn(Company, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = CompanyDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map branches using BranchDomainMapper', () => {
            CompanyDomainMapper.toDomain(basePrismaObj);
            expect(spyBranchDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyBranchDomainMapper).toHaveBeenCalledWith({ ...basePrismaObj.branches[0] });
        });

        it('should create external keys using CompanyExternalKey when token is present', () => {
            CompanyDomainMapper.toDomain(basePrismaObj);
            expect(spyCompanyExternalKeyCreate).toHaveBeenCalledWith({ ...basePrismaObj.externalKeys[0] });
        });
    });
});
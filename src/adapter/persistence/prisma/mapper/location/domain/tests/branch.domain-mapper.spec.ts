import { Branch } from "@omega/location/core/domain/corporative/branch.domain";
import { BranchExternalKey, BranchExternalKeyProps } from "@omega/location/core/domain/corporative/value-objects/branch-external-key.value-object";
import { BranchExternalKey as PrismaBranchExternalKey, Prisma } from "@prisma/client";
import { BranchDomainMapper, PrismaBranchExtended } from "../branch.domain-mapper";

describe('BranchDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an Branch domain object to Prisma input', () => {
            const domainObj: Branch = {
                id: 'exam-type-123',
                name: 'Branch Type',
                cityId: 78,
                companyId: 'company-123',
            } as unknown as Branch;

            const expected: Prisma.BranchUncheckedCreateInput = {
                id: 'exam-type-123',
                name: 'Branch Type',
                cityId: 78,
                companyId: 'company-123',
            }

            const result = BranchDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: Branch = {
                id: 'exam-type-123',
                name: 'Branch Type',
                cityId: 78,
                companyId: 'company-123',
            } as unknown as Branch;

            const result = BranchDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
            expect(result.cityId).toBe(domainObj.cityId);
            expect(result.companyId).toBe(domainObj.companyId);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaBranchExtended = {
            id: "id-123",
            name: "Laboratory Test",
            cityId: 78,
            companyId: 'company-123',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            externalKeys: [{ id: 'test-123' }] as unknown as PrismaBranchExternalKey[]
        };

        let spyBranchExternalKeyCreate: jest.SpyInstance<BranchExternalKey, [value: BranchExternalKeyProps], any>;

        beforeEach(() => {
            jest.clearAllMocks();
            spyBranchExternalKeyCreate = jest.spyOn(BranchExternalKey, 'create').mockReturnValue({ mapped: 'token' } as unknown as BranchExternalKey);
        });

        it('should correctly map a PrismaBranchExtended to an Branch domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as Branch;
            jest.spyOn(Branch, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = BranchDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should create external keys using BranchExternalKey when token is present', () => {
            BranchDomainMapper.toDomain(basePrismaObj);
            expect(spyBranchExternalKeyCreate).toHaveBeenCalledWith({ ...basePrismaObj.externalKeys[0] });
        });
    });
});
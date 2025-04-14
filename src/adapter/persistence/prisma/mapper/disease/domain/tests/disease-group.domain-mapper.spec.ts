import { DiseaseGroup } from "@omega/disease/core/domain/disease-group.domain";
import { Prisma, DiseaseGroup as PrismaDiseaseGroup, Disease as PrismaDisease } from "@prisma/client";
import { DiseaseGroupDomainMapper, PrismaDiseaseGroupWithDiseases } from "../disease-group.domain-mapper";
import { DiseaseDomainMapper } from "../disease.domain-mapper";
import { Disease } from "@omega/disease/core/domain/disease.domain";

describe('DiseaseGroupDomainMapper', () => {
    describe('toPrisma', () => {
        it('should correctly map an DiseaseGroup domain object to Prisma input', () => {
            const domainObj: DiseaseGroup = {
                id: 'group-1',
                name: 'Infectious Diseases'
            } as unknown as DiseaseGroup;

            const expected: Prisma.DiseaseGroupUncheckedCreateInput = {
                id: 'group-1',
                name: 'Infectious Diseases'
            }

            const result = DiseaseGroupDomainMapper.toPrisma(domainObj);

            expect(result).toEqual(expected);
        });

        it('should map all basic fields', () => {
            const domainObj: DiseaseGroup = {
                id: 'group-1',
                name: 'Infectious Diseases'
            } as unknown as DiseaseGroup;

            const result = DiseaseGroupDomainMapper.toPrisma(domainObj);

            expect(result.id).toBe(domainObj.id);
            expect(result.name).toBe(domainObj.name);
        });

    });

    describe('toDomain', () => {
        const basePrismaObj: PrismaDiseaseGroupWithDiseases = {
            id: 'auth-xyz',
            name: 'Alice',
            diseases: [{ id: 'disease-1', name: 'Flu' }] as PrismaDisease[]
        } as PrismaDiseaseGroupWithDiseases;

        let spyDiseaseDomainMapper;

        beforeEach(() => {
            jest.clearAllMocks();
            spyDiseaseDomainMapper = jest.spyOn(DiseaseDomainMapper, 'toDomain').mockReturnValue({ mapped: 'apikey' } as unknown as Disease);
        });

        it('should correctly map a PrismaDiseaseGroupWithDiseases to an DiseaseGroup domain object', () => {

            const expectedDomainObj = { test: 'domain' } as unknown as DiseaseGroup;
            jest.spyOn(DiseaseGroup, "rehydrate").mockReturnValue(expectedDomainObj);

            const result = DiseaseGroupDomainMapper.toDomain(basePrismaObj);

            expect(result).toBe(expectedDomainObj);
        });

        it('should map diseases using DiseaseDomainMapper', () => {
            DiseaseGroupDomainMapper.toDomain(basePrismaObj);
            expect(spyDiseaseDomainMapper).toHaveBeenCalledTimes(1);
            expect(spyDiseaseDomainMapper).toHaveBeenCalledWith({ id: 'disease-1', name: 'Flu' });
        });
    });
});
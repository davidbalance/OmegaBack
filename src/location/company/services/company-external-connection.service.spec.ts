import { ExternalCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/request/external-corporative-group.base.dto";
import { CorporativeGroup } from "@/location/corporative-group/dtos/response/corporative-group.base.dto";
import { mockCorporativeGroup } from "@/location/corporative-group/stub/corporative-group.stub";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { PatchCompanyExternalRequestDto } from "../dtos/request/external-company.patch.dto";
import { PostCompanyExternalRequestDto } from "../dtos/request/external-company.post.dto";
import { CompanyRepository } from "../repositories/company.repository";
import { mockCompanyExternalKey } from "../stub/company-external-key.stub";
import { mockCompanyEntity } from "../stub/company-entity.stub";
import { CompanyExternalConnectionService } from "./company-external-connection.service";
import { CompanyExternalKeyService } from "./company-external-key.service";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";

describe('CompanyExternalConnectionService', () => {
    let service: CompanyExternalConnectionService;
    let repository: jest.Mocked<CompanyRepository>;
    let externalService: jest.Mocked<IExternalConnectionService<ExternalCorporativeGroupRequestDto, CorporativeGroup>>;
    let keyService: jest.Mocked<CompanyExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CompanyExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(CompanyRepository);
        externalService = unitRef.get(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION);
        keyService = unitRef.get(CompanyExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('findOne', async () => {
        expect(service.findOne).toBeDefined()
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const corporativeGroupData: ExternalCorporativeGroupRequestDto = { name: 'Test Group' };
        const corporativeGroupKey = 'test-corporative-group-key';
        const companyData = {
            name: 'Test Company',
            ruc: '1234567890',
            address: "Test address",
            phone: "0999999999"
        };
        const data: PostCompanyExternalRequestDto = {
            corporativeGroup: { key: corporativeGroupKey, ...corporativeGroupData },
            ...companyData,
        };
        const keyParam = { source, key };
        const mockedGroup = mockCorporativeGroup();
        const mockedKey = mockCompanyExternalKey();
        const mockedCompany = mockCompanyEntity();
        const expectedValue = mockedCompany;

        it('should create a new company', async () => {
            // Arrange
            externalService.findOneOrCreate.mockResolvedValue(mockedGroup);
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedCompany);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: corporativeGroupKey }, corporativeGroupData);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...companyData,
                corporativeGroup: mockedGroup,
                externalKey: mockedKey
            });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if company creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            externalService.findOneOrCreate.mockResolvedValue(mockedGroup);
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: corporativeGroupKey }, corporativeGroupData);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...companyData,
                corporativeGroup: mockedGroup,
                externalKey: mockedKey
            });
            expect(keyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const corporativeGroupData: ExternalCorporativeGroupRequestDto = { name: 'Test Group' };
        const corporativeGroupKey = 'test-corporative-group-key';
        const companyData = {
            name: 'Test Company',
            ruc: '1234567890',
            address: "Test address",
            phone: "0999999999"
        };
        const data: PostCompanyExternalRequestDto = { corporativeGroup: { key: corporativeGroupKey, ...corporativeGroupData }, ...companyData };
        const keyParam = { source, key };
        const mockedCompany = mockCompanyEntity();
        const expectedValue = mockedCompany;

        it('should find a company by external key or ruc', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedCompany);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ externalKey: keyParam }, { ruc: data.ruc }]
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new company if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedCompany);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ externalKey: keyParam }, { ruc: data.ruc }]
            });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchCompanyExternalRequestDto = {
            name: 'Updated Company',
            ruc: '1234567890',
            address: "Test address",
            phone: "0999999999"
        };
        const keyParam = { source, key };
        const mockedCompany = mockCompanyEntity();
        const expectedValue = mockedCompany;

        it('should update a company', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedCompany);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});

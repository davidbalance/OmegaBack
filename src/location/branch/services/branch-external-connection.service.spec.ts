import { CityService } from "@/location/city/services/city.service";
import { mockCity } from "@/location/city/stub/city.stub";
import { PostCompanyExternalRequestDto } from "@/location/company/dtos/request/external-company.post.dto";
import { Company } from "@/location/company/dtos/response/company.base.dto";
import { mockCompany } from "@/location/company/stub/company.stub";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { PatchBranchExternalRequestDto } from "../dtos/request/external-branch.patch.dto";
import { PostBranchExternalRequestDto } from "../dtos/request/external-branch.post.dto";
import { BranchRepository } from "../repositories/branch.repository";
import { mockBranchExternalKey } from "../stub/branch-external-key.stub";
import { BranchExternalConnectionService } from "./branch-external-connection.service";
import { BranchExternalKeyService } from "./branch-external-key.service";
import { INJECT_COMPANY_EXTERNAL_KEY } from "@/location/company/services/company-external-connection.service";
import { mockBranchEntity } from "../stub/branch-entity.stub";

describe('BranchExternalConnectionService', () => {
    let service: BranchExternalConnectionService;
    let repository: jest.Mocked<BranchRepository>;
    let externalService: jest.Mocked<IExternalConnectionService<PostCompanyExternalRequestDto, Company>>;
    let keyService: jest.Mocked<BranchExternalKeyService>;
    let cityService: jest.Mocked<CityService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(BranchRepository);
        externalService = unitRef.get(INJECT_COMPANY_EXTERNAL_KEY);
        keyService = unitRef.get(BranchExternalKeyService);
        cityService = unitRef.get(CityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findOne', async () => {
        expect(service.findOne).toBeDefined()
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const companyKey = 'test-company-key';
        const companyData = {
            name: 'Test Company',
            ruc: '1234567890',
            key: companyKey,
            corporativeGroup: {
                key: "test-group-key",
                name: "Test group"
            },
            address: "Test Address",
            phone: "0999999999"
        };
        const city = 'Test City';
        const data: PostBranchExternalRequestDto = {
            company: companyData,
            city,
            name: 'Test Branch'
        };
        const keyParam = { source, key };
        const mockedCompany = mockCompany();
        const mockedCity = mockCity();
        const mockedKey = mockBranchExternalKey();
        const mockedBranch = mockBranchEntity();
        const expectedValue = mockedBranch;

        it('should create a new branch', async () => {
            // Arrange
            externalService.findOneOrCreate.mockResolvedValue(mockedCompany);
            cityService.findOneByName.mockResolvedValue(mockedCity);
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedBranch);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            const { key, ...companyExpected } = companyData;
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: companyKey }, companyExpected);
            expect(cityService.findOneByName).toHaveBeenCalledWith(city);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                city: mockedCity,
                company: mockedCompany,
                externalKey: mockedKey
            });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if branch creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            externalService.findOneOrCreate.mockResolvedValue(mockedCompany);
            cityService.findOneByName.mockResolvedValue(mockedCity);
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            const { key, ...companyExpected } = companyData;
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: companyKey }, companyExpected);
            expect(cityService.findOneByName).toHaveBeenCalledWith(city);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                city: mockedCity,
                company: mockedCompany,
                externalKey: mockedKey
            });
            expect(keyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const companyKey = 'test-company-key';
        const companyData = {
            name: 'Test Company',
            ruc: '1234567890',
            key: companyKey,
            corporativeGroup: {
                key: "test-group-key",
                name: "Test group"
            },
            address: "Test Address",
            phone: "0999999999"
        };
        const city = 'Test City';
        const data: PostBranchExternalRequestDto = {
            company: companyData,
            city,
            name: 'Test Branch'
        };
        const keyParam = { source, key };
        const mockedBranch = mockBranchEntity();
        const expectedValue = mockedBranch;

        it('should find a branch by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedBranch);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: keyParam },
                relations: { company: { corporativeGroup: true } }
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new branch if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedBranch);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: keyParam },
                relations: { company: { corporativeGroup: true } }
            });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchBranchExternalRequestDto = { name: 'Updated Branch' };
        const keyParam = { source, key };
        const mockedBranch = mockBranchEntity();
        const expectedValue = mockedBranch;

        it('should update a branch', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedBranch);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});

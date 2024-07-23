import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { NotFoundException } from "@nestjs/common";
import { BranchExternalConnectionService } from "../branch-external-connection.service";
import { BranchRepository } from "../../repositories/branch.repository";
import { BranchExternalKeyService } from "../branch-external-key.service";
import { INJECT_COMPANY_EXTERNAL_KEY } from "@/location/company/services/company-external-connection.service";
import { Company } from "@/location/company/entities/company.entity";
import { mockBranchExternalKey } from "./stub/branch-external-key.stub";
import { mockBranch } from "./stub/branch.stub";
import { mockCompany } from "@/location/company/services/test/stub/company.stub";
import { CityService } from "@/location/city/services/city.service";
import { mockCity } from "@/location/city/services/test/stub/city.stub";
import { PatchBranchRequestDto } from "../../dtos/request/patch.branch.request.dto";
import { PostBranchRequestDto } from "../../dtos/request/post.branch.request.dto";
import { PostCompanyExternalRequestDto } from "@/location/company/dtos/request/post.company-external.request.dto";
import { PostBranchExternalRequestDto } from "../../dtos/request/post.branch-external.request.dto";

describe('BranchExternalConnectionService', () => {
    let service: BranchExternalConnectionService;
    let repository: jest.Mocked<BranchRepository>;
    let externalKeyService: jest.Mocked<BranchExternalKeyService>;
    let cityService: jest.Mocked<CityService>;
    let externalService: jest.Mocked<IExternalConnectionService<PostCompanyExternalRequestDto, Company>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(BranchRepository);
        externalKeyService = unitRef.get(BranchExternalKeyService);
        externalService = unitRef.get(INJECT_COMPANY_EXTERNAL_KEY);
        cityService = unitRef.get(CityService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedCompany = mockCompany();
        const mockedCity = mockCity();
        const mockedBranch = mockBranch();
        const mockedKey = mockBranchExternalKey();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostBranchExternalRequestDto = {
            name: "my-test-corporative-group",
            city: "my-city",
            company: {
                key: 'my-company-test-key',
                address: mockedCompany.address,
                corporativeGroup: null,
                name: mockedCompany.name,
                phone: mockedCompany.phone,
                ruc: mockedCompany.ruc
            }
        };

        it('should create an company with a given key', async () => {
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCompany);
            cityService.findOneByName.mockResolvedValueOnce(mockedCity);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedBranch);

            const { city, company, ...branch } = mockDto;

            const result = await service.create({ key, source }, mockDto);
            const { key: companyKey, ...testCompany } = company;

            expect(result).toEqual(result);
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ key: companyKey, source }, testCompany);
            expect(cityService.findOneByName).toHaveBeenCalledWith(mockDto.city);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...branch,
                city: mockedCity,
                company: mockedCompany,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the company', async () => {
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCompany);
            cityService.findOneByName.mockResolvedValueOnce(mockedCity);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            const { city, company, ...branch } = mockDto;
            const { key: companyKey, ...testCompany } = company;


            await expect(service.create({ key, source }, mockDto)).rejects.toThrow(Error);
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ key: companyKey, source }, testCompany);
            expect(cityService.findOneByName).toHaveBeenCalledWith(mockDto.city);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...branch,
                city: mockedCity,
                company: mockedCompany,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedCompany = mockCompany();
        const mockedCity = mockCity();
        const mockedBranch = mockBranch();
        const mockedKey = mockBranchExternalKey();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostBranchExternalRequestDto = {
            name: "my-test-corporative-group",
            city: "my-city",
            company: {
                key: 'my-company-test-key',
                address: mockedCompany.address,
                corporativeGroup: null,
                name: mockedCompany.name,
                phone: mockedCompany.phone,
                ruc: mockedCompany.ruc
            }
        };


        it('should find an existing company and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedBranch);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedBranch);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { source, key } },
                relations: { company: { corporativeGroup: true } }
            });
        });

        it('should not find company so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCompany);
            cityService.findOneByName.mockResolvedValueOnce(mockedCity);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce({ ...mockedBranch, company: mockedCompany });

            const { city, company, ...branch } = mockDto;
            const { key: companyKey, ...testCompany } = company;

            const result = await service.findOneOrCreate({ key, source }, mockDto);


            expect(result).toEqual({ ...mockedBranch, company: mockedCompany });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { source, key } },
                relations: { company: { corporativeGroup: true } }
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ source, key: companyKey }, testCompany);
            expect(cityService.findOneByName).toHaveBeenCalledWith(mockDto.city);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...branch,
                city: mockedCity,
                company: mockedCompany,
                externalKey: mockedKey
            });
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedBranch = mockBranch();
        const source: string = 'source';
        const key: string = 'key';
        const mockDto: PatchBranchRequestDto = {
            name: "my-test-corporative-group",
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedBranch);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedBranch);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});

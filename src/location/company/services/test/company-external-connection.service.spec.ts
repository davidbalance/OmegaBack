import { POSTCorporativeGroupExternalConnectionRequestDto } from "@/location/corporative-group/dtos/post.corporative-group-external-connection.dto";
import { CorporativeGroup } from "@/location/corporative-group/entities/corporative-group.entity";
import { mockCorporativeGroup } from "@/location/corporative-group/services/test/stub/corporative-group.stub";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { NotFoundException } from "@nestjs/common";
import { CompanyRepository } from "../../repositories/company.repository";
import { CompanyExternalConnectionService } from "../company-external-connection.service";
import { CompanyExternalKeyService } from "../company-external-key.service";
import { INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION } from "@/location/corporative-group/services/corporative-group-external-connection.service";
import { mockCompany } from "./stub/company.stub";
import { PATCHCompanyRequestDto, POSTCompanyRequestDto } from "../../dtos/request/post.company.request.dto";
import { mockCompanyExternalKey } from "./stub/company-external-key.stub";

describe('CompanyExternalConnectionService', () => {
    let service: CompanyExternalConnectionService;
    let repository: jest.Mocked<CompanyRepository>;
    let externalKeyService: jest.Mocked<CompanyExternalKeyService>;
    let externalService: jest.Mocked<IExternalConnectionService<POSTCorporativeGroupExternalConnectionRequestDto, CorporativeGroup>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CompanyExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(CompanyRepository);
        externalKeyService = unitRef.get(CompanyExternalKeyService);
        externalService = unitRef.get(INJECT_CORPORATIVE_GROUP_EXTERNAL_CONNECTION);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedCorporativeGroup = mockCorporativeGroup();
        const mockedCompany = mockCompany();
        const mockedKey = mockCompanyExternalKey();

        const source: string = 'source';
        const mockDto: POSTCompanyRequestDto = {
            key: "test-outbound-service",
            name: "my-test-corporative-group",
            ruc: "1234567890",
            address: "my-mocked-addres",
            phone: "my-mocked-phone",
            corporativeGroup: null
        };

        it('should create an company with a given key', async () => {
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCorporativeGroup);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedCompany);

            const { key, corporativeGroup, ...company } = mockDto;

            const result = await service.create({ ...mockDto, source });

            expect(result).toEqual(result);
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ source, ...corporativeGroup });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...company,
                corporativeGroup: mockedCorporativeGroup,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the company', async () => {
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCorporativeGroup);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            const { key, corporativeGroup, ...company } = mockDto;

            await expect(service.create({ ...mockDto, source }))
                .rejects
                .toThrow(Error);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...company,
                corporativeGroup: mockedCorporativeGroup,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedCorporativeGroup = mockCorporativeGroup();
        const mockedKey = mockCompanyExternalKey();
        const mockedCompany = mockCompany();
        const source: string = 'source';
        const mockDto: POSTCompanyRequestDto = {
            key: "test-outbound-service",
            name: "my-test-corporative-group",
            ruc: "1234567890",
            address: "my-mocked-addres",
            phone: "my-mocked-phone",
            corporativeGroup: null
        };

        it('should find an existing company and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedCompany);

            const result = await service.findOneOrCreate({ ...mockDto, source });

            const { key } = mockDto;
            expect(result).toEqual(mockedCompany);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source: source, key: key } },
                    { ruc: mockDto.ruc }
                ]
            });
        });

        it('should not find company so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalService.findOneOrCreate.mockReturnValueOnce(mockedCorporativeGroup);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce({ ...mockedCompany, corporativeGroup: mockedCorporativeGroup });

            const result = await service.findOneOrCreate({ ...mockDto, source });

            const { key, corporativeGroup, ...company } = mockDto;

            expect(result).toEqual(result);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source: source, key: key } },
                    { ruc: company.ruc }
                ]
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...company,
                corporativeGroup: mockedCorporativeGroup,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedCompany = mockCompany();
        const source: string = 'source';
        const key: string = 'key';
        const mockDto: PATCHCompanyRequestDto = {
            name: "my-test-corporative-group",
            address: "my-stub-address",
            phone: "0987654321"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedCompany);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedCompany);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});

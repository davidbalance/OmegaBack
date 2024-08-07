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
import { mockCompanyExternalKey } from "./stub/company-external-key.stub";
import { PostCorporativeGroupRequestDto } from "@/location/corporative-group/dtos/request/post.corporative-group.dto";
import { PostCompanyExternalRequestDto } from "../../dtos/request/post.company-external.request.dto";
import { PatchCompanyRequestDto } from "../../dtos/request/patch.company.request.dto";

describe('CompanyExternalConnectionService', () => {
    let service: CompanyExternalConnectionService;
    let repository: jest.Mocked<CompanyRepository>;
    let externalKeyService: jest.Mocked<CompanyExternalKeyService>;
    let externalService: jest.Mocked<IExternalConnectionService<PostCorporativeGroupRequestDto, CorporativeGroup>>;

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

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostCompanyExternalRequestDto = {
            name: "my-test-corporative-group",
            ruc: "1234567890",
            address: "my-mocked-addres",
            phone: "my-mocked-phone",
            corporativeGroup: {
                name: mockedCompany.name,
                key: 'my-test-key',
            }
        };

        beforeEach(() => {
            externalService.findOneOrCreate.mockResolvedValueOnce(mockedCorporativeGroup);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
        });

        it('should create an company with a given key', async () => {
            // Arrange
            repository.create.mockResolvedValueOnce(mockedCompany);

            const { corporativeGroup, ...company } = mockDto;
            const { key: corporativeKey, ...corporativeTest } = corporativeGroup

            // Act
            const result = await service.create({ key, source }, mockDto);

            // Assert
            expect(result).toEqual(result);
            expect(externalService.findOneOrCreate).toHaveBeenCalledWith({ key: corporativeKey, source }, corporativeTest);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...company,
                corporativeGroup: mockedCorporativeGroup,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });

        it('should throw an error so not create the company', async () => {
            // Arrange
            repository.create.mockRejectedValueOnce(new Error());
            const { corporativeGroup, ...company } = mockDto;

            // Act & Assert
            await expect(service.create({ key, source }, mockDto))
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

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostCompanyExternalRequestDto = {
            name: "my-test-corporative-group",
            ruc: "1234567890",
            address: "my-mocked-addres",
            phone: "my-mocked-phone",
            corporativeGroup: {
                key: 'my-test-key',
                name: 'test-corporative-name'
            }
        };

        it('should find an existing company and return it', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedCompany);

            // Act
            const result = await service.findOneOrCreate({ key, source }, mockDto);

            // Assert
            expect(result).toEqual(mockedCompany);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source: source, key: key } },
                    { ruc: mockDto.ruc }
                ]
            });
            expect(externalService.findOneOrCreate).not.toHaveBeenCalled();
            expect(externalKeyService.create).not.toHaveBeenCalled();
            expect(repository.create).not.toHaveBeenCalled();
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });

        it('should not find company so creates it', async () => {
            // Arrange
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalService.findOneOrCreate.mockReturnValueOnce(mockedCorporativeGroup);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce({ ...mockedCompany, corporativeGroup: mockedCorporativeGroup });
            const { corporativeGroup, ...company } = mockDto;

            // Act
            const result = await service.findOneOrCreate({ key, source }, mockDto);

            // Assert
            expect(result).toEqual(result);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source, key } },
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
        const mockDto: PatchCompanyRequestDto = {
            name: "my-test-corporative-group",
            address: "my-stub-address",
            phone: "0987654321"
        };

        it('should update an existing exam', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedCompany);

            // Act
            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            // Assert
            expect(result).toEqual(mockedCompany);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});

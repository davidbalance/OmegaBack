import { TestBed } from "@automock/jest";
import { CompanyExternalConnectionController } from "./company-external-connection.controller";
import { CompanyExternalConnectionService } from "../services/company-external-connection.service";
import { PostCompanyExternalRequestDto } from "../dtos/request/external-company.post.dto";
import { mockExternalCompany } from "../stub/external-company.stub";
import { PatchCompanyExternalRequestDto } from "../dtos/request/external-company.patch.dto";

describe('CompanyExternalConnectionController', () => {
    let controller: CompanyExternalConnectionController;
    let service: jest.Mocked<CompanyExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CompanyExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(CompanyExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostCompanyExternalRequestDto = {
            name: 'New Company',
            corporativeGroup: undefined,
            ruc: "1234567890001",
            address: "Test address",
            phone: "0999999999"
        };
        const mockedCompany = mockExternalCompany();
        const expectedValue = mockedCompany;

        it('should call the service to create a new company', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedCompany);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchCompanyExternalRequestDto = {
            name: 'Updated Company',
            address: "Test address",
            phone: "0999999999",
            ruc: "1234567890"
        };
        const mockedCompany = mockExternalCompany();
        const expectedValue = mockedCompany;

        it('should call the service to update a company', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedCompany);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });
});
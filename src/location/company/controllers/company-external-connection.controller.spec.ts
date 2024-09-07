/* import { TestBed } from "@automock/jest";
import { CompanyExternalConnectionService } from "../services/company-external-connection.service";
import { CompanyExternalConnectionController } from "./company-external-connection.controller";
import { PostCompanyExternalRequestDto } from "../dtos/request/external-company.post.dto";
import { mockCompany } from "../stub/company.stub";
import { PostCompanyResponseDto } from "../dtos/response/post.company.response.dto";
import { PatchCompanyRequestDto } from "../dtos/request/company.patch.dto";
import { PatchCompanyResponseDto } from "../dtos/response/patch.company.response.dto"; */

import { CompanyExternalConnectionController } from "./company-external-connection.controller";

describe('CompanyExternalConnectionController', () => {
    let controller: CompanyExternalConnectionController;

    it('', () => {
        expect(controller).toBeDefined();
    });
    /* let service: jest.Mocked<CompanyExternalConnectionService>;

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
        const mockedCompany = mockCompany();
        const mockedResponse: PostCompanyResponseDto = mockedCompany;

        it('should call the service to create a new company', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedCompany);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockedResponse);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchCompanyRequestDto = {
            name: 'Updated Company',
            address: "Test address",
            phone: "0999999999"
        };
        const mockCompanyData = mockCompany();
        const mockResponse: PatchCompanyResponseDto = mockCompanyData;
    
        it('should call the service to update a company', async () => {
          // Arrange
          service.findOneAndUpdate.mockResolvedValue(mockCompanyData);
    
          // Act
          const result = await controller.findOneAndUpdate(source, key, mockDto);
    
          // Assert
          expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
          expect(result).toEqual(mockResponse);
        });
      }); */
});
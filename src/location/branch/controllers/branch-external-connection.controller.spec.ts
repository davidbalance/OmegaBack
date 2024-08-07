import { TestBed } from "@automock/jest";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { BranchExternalConnectionController } from "./branch-external-connection.controller";
import { PostBranchExternalRequestDto } from "../dtos/request/post.branch-external.request.dto";
import { mockBranch } from "../services/test/stub/branch.stub";
import { PostBranchResponseDto } from "../dtos/response/post.branch.response.dto";
import { PatchBranchRequestDto } from "../dtos/request/patch.branch.request.dto";
import { PatchBranchResponseDto } from "../dtos/response/patch.branch.response.dto";

describe('BranchExternalConnectionController', () => {
    let controller: BranchExternalConnectionController;
    let service: jest.Mocked<BranchExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(BranchExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostBranchExternalRequestDto = {
            name: 'New Branch',
            company: undefined,
            city: ""
        };
        const mockBranchData = mockBranch();
        const mockResponse: PostBranchResponseDto = mockBranchData;

        it('should call the service to create a new branch', async () => {
            // Arrange
            service.create.mockResolvedValue(mockBranchData);

            // Act
            const result = await controller.create(source, key, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PatchBranchRequestDto = {
            name: "test branch"
        };
        const mockBranchData = mockBranch();
        const mockResponse: PatchBranchResponseDto = mockBranchData;
    
        it('should call the service to update a branch', async () => {
          // Arrange
          service.findOneAndUpdate.mockResolvedValue(mockBranchData);
    
          // Act
          const result = await controller.findOneAndUpdate(source, key, mockDto);
    
          // Assert
          expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
          expect(result).toEqual(mockResponse);
        });
      });
    
});
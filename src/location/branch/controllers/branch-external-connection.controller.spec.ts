import { TestBed } from "@automock/jest";
import { BranchExternalConnectionController } from "./branch-external-connection.controller";
import { PostBranchExternalRequestDto } from "../dtos/request/external-branch.post.dto";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { mockExternalBranch } from "../stub/extended-branch.stub";
import { PatchBranchExternalRequestDto } from "../dtos/request/external-branch.patch.dto";

describe('BranchExternalConnectionController', () => {
    let controller: BranchExternalConnectionController;
    let service: jest.Mocked<BranchExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(BranchExternalConnectionService);
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const mockDto: PostBranchExternalRequestDto = {
            name: 'New Branch',
            company: {
                key: "company-key",
                corporativeGroup: {
                    key: "group-key",
                    name: "Test group"
                },
                name: "Test company",
                ruc: "1234567890",
                address: "Test address",
                phone: "0999999999"
            },
            city: "Quito"
        };
        const mockedBranch = mockExternalBranch();
        const expectedValue = mockedBranch;

        it('should call the service to create a new branch', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedBranch);

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
        const mockDto: PatchBranchExternalRequestDto = {
            name: "test branch"
        };
        const mockedBranch = mockExternalBranch();
        const expectedValue = mockedBranch

        it('should call the service to update a branch', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedBranch);

            // Act
            const result = await controller.findOneAndUpdate(source, key, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, mockDto);
            expect(result).toEqual(expectedValue);
        });
    });

});
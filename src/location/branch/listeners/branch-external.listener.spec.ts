import { TestBed } from "@automock/jest";
import { BranchExternalConnectionService } from "../services/branch-external-connection.service";
import { BranchExternalListener } from "./branch-external.listener";
import { PostBranchExternalRequestDto } from "../dtos/request/external-branch.post.dto";

describe('BranchExternalListener', () => {
    let service: BranchExternalListener;
    let externalConnectionService: jest.Mocked<BranchExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalListener).compile();

        service = unit;
        externalConnectionService = unitRef.get(BranchExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onExternalCreate', () => {
        const key = 'key';
        const source = 'source';
        const mockData: PostBranchExternalRequestDto = {
            company: undefined,
            name: "",
            city: ""
        };

        it('should call the external service to create a new branch', async () => {
            // Arrange
            externalConnectionService.findOneOrCreate.mockResolvedValue(undefined);

            // Act
            await service.onExternalCreate({ key, source, data: mockData });

            // Assert
            expect(externalConnectionService.findOneOrCreate).toHaveBeenCalledWith({ key, source }, mockData);
        });
    });
});
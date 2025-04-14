import { BranchExternalConnectionModel } from "@omega/location/core/models/corporative/branch-external-connection.model";
import { BranchExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { BranchExternalConnectionModelMapper } from "../branch-external-connection.model-mapper";

describe('BranchExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an BranchExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            branchExternalKey: 'key-123',
            branchExternalOwner: 'owner',
            branchId: 'branch-123',
            companyId: 'company-123'
        };

        const expectedValue = new BranchExternalConnectionModel({ ...prismaValue });
        const result = BranchExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.branchExternalKey).toBe(expectedValue.branchExternalKey);
        expect(result.branchExternalOwner).toBe(expectedValue.branchExternalOwner);
        expect(result.branchId).toBe(expectedValue.branchId);
        expect(result.companyId).toBe(expectedValue.companyId);
    });
});

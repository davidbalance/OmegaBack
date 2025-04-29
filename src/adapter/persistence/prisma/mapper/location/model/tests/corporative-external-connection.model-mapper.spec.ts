import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";
import { CorporativeExternalConnectionModel as PrismaExternalConnection } from "@prisma/client";
import { CorporativeExternalConnectionModelMapper } from "../corporative-external-connection.model-mapper";

describe('CorporativeExternalConnectionModelMapper', () => {
    it('should correctly map a PrismaExternalConnection to an CorporativeExternalConnectionModel instance', () => {
        const prismaValue: PrismaExternalConnection = {
            corporativeExternalKey: 'key-123',
            corporativeExternalOwner: 'owner',
            corporativeId: 'branch-123',
        };

        const expectedValue = new CorporativeExternalConnectionModel({ ...prismaValue });
        const result = CorporativeExternalConnectionModelMapper.toModel(prismaValue);
        expect(result.corporativeExternalKey).toBe(expectedValue.corporativeExternalKey);
        expect(result.corporativeExternalOwner).toBe(expectedValue.corporativeExternalOwner);
        expect(result.corporativeId).toBe(expectedValue.corporativeId);
    });
});
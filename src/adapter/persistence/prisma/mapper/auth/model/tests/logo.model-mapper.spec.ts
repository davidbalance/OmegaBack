import { LogoModel } from "@omega/auth/core/model/logo/logo.model";
import { LogoModel as PrismaLogoModel } from "@prisma/client";
import { LogoModelMapper } from "../logo.model-mapper";

describe('LogoModelMapper', () => {
    it('should correctly map a PrismaLogoModel to an ApiKeyValueModel instance', () => {
        const prismaValue: PrismaLogoModel = {
            logoId: 'logo-id',
            logoName: 'logo-name'
        };

        const expectedValue = new LogoModel({ ...prismaValue });
        const result = LogoModelMapper.toModel(prismaValue);
        expect(result.logoId).toBe(expectedValue.logoId);
        expect(result.logoName).toBe(expectedValue.logoName);
    });
});
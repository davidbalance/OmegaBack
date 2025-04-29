import { UserModel } from "@omega/profile/core/model/user/user.model";
import { UserModel as PrismaUserModel } from "@prisma/client";
import { UserModelMapper } from "../user.model-mapper";

describe('UserModelMapper', () => {
    it('should correctly map a PrismaUserModel to an UserModel instance', () => {
        const prismaValue: PrismaUserModel = {
            userId: "user-123",
            userDni: "1234567890",
            userEmail: "test@email.com",
            userName: "User",
            userLastname: "Lastname",
            authId: "auth-123"
        };

        const expectedValue = new UserModel({ ...prismaValue });
        const result = UserModelMapper.toModel(prismaValue);
        expect(result.userId).toBe(expectedValue.userId);
        expect(result.userDni).toBe(expectedValue.userDni);
        expect(result.userEmail).toBe(expectedValue.userEmail);
        expect(result.userName).toBe(expectedValue.userName);
        expect(result.userLastname).toBe(expectedValue.userLastname);
        expect(result.authId).toBe(expectedValue.authId);
    });
});
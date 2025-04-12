import { UserExtraAttribute } from "@/user/user/entities/user-extra-attribute.entity";
import { User } from "@/user/user/entities/user.entity";
import { mockUser } from "./user-management.stub";

const stubUserAttribute = (id: number): Omit<UserExtraAttribute, 'user'> => ({
    id: id,
    name: 'my-stub-attribute',
    value: 'stub-attribute-value',
    createAt: new Date(),
    updateAt: new Date()
});

export const mockUserAttribute = stubUserAttribute(1);

export const mockUserAttributes = [1, 2, 3, 4].map(stubUserAttribute);
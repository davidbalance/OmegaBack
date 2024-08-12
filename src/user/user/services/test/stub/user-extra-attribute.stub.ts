import { UserExtraAttribute } from "@/user/user/entities/user-extra-attribute.entity";

const stubUserAttribute = (id: number): UserExtraAttribute => ({
    id: id,
    name: 'my-stub-attribute',
    value: 'stub-attribute-value',
    createAt: new Date(),
    updateAt: new Date(),
    user: undefined
});

export const mockUserAttribute = () => stubUserAttribute(1);

export const mockUserAttributeArray = () => [1, 2, 3, 4].map(stubUserAttribute);
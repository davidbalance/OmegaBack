import { User } from "@/user/user/entities/user.entity";
import { mockUserAttributeArray } from "./user-extra-attribute.stub";

const stubUser = (id: number): User => ({
    id: id,
    dni: '1234567890',
    email: 'my-stub-email@email.com',
    name: 'User',
    lastname: 'Stub',
    extraAttributes: mockUserAttributeArray() as any,
    hasCredential: true,
    status: true,
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockUser = () => stubUser(1);

export const mockUserArray = () => [1, 2, 3, 4].map(stubUser);
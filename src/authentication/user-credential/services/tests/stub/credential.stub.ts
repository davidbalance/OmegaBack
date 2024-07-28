import { UserCredential } from "@/authentication/user-credential/entities/user-credential.entity";

const stubCredential = (id: number): UserCredential => ({
    id: id,
    email: "stub@email.com",
    password: "stub-password",
    user: 1,
    status: false,
    apiKeys: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockCredential = () => stubCredential(1);
export const mockCredentials = () => [1, 2, 3, 4, 5].map(stubCredential);
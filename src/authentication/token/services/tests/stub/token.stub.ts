import { Token } from "@/authentication/token/entities/token.entity";

const stubToken = (): Token => ({
    id: 1,
    key: 1,
    token: "stub-token",
    expiresAt: new Date(),
    createAt: new Date(),
    updateAt: new Date()
});

export const mockToken = () => stubToken();
import { ApiKey } from "@/authentication/api-key/entities/api-key.entity";
import { mockCredential } from "@/authentication/user-credential/services/tests/stub/credential.stub";

const stubApikey = (id: number): ApiKey => ({
    id: id,
    value: "stub-value",
    name: "stub-key",
    expiresAt: undefined,
    status: false,
    credential: mockCredential(),
    createAt: new Date(),
    updateAt: new Date()
});

export const mockApiKey = () => stubApikey(1);
export const mockApiKeys = () => [1, 2, 3, 4, 5].map(stubApikey);
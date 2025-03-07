/* eslint-disable @typescript-eslint/unbound-method */
import { AuthRepository, AuthResourceRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthGenerateTokenQuery, AuthGenerateTokenQueryPayload } from "../auth-generate-token.query";
import { AuthModel } from "@omega/auth/core/model/auth/auth.model";
import { AuthResourceModel } from "@omega/auth/core/model/auth/auth_resource.model";

describe("AuthGenerateTokenQuery", () => {
    let authRepository: jest.Mocked<AuthRepository>;
    let resourceRepository: jest.Mocked<AuthResourceRepository>;
    let jwtProvider: jest.Mocked<JwtProvider>;
    let query: AuthGenerateTokenQuery;

    beforeEach(() => {
        authRepository = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthRepository>;

        resourceRepository = {
            findManyAsync: jest.fn(),
        } as unknown as jest.Mocked<AuthResourceRepository>;

        jwtProvider = {
            createJwt: jest.fn(),
        } as unknown as jest.Mocked<JwtProvider>;

        query = new AuthGenerateTokenQuery(authRepository, resourceRepository, jwtProvider);
    });

    it("should generate JWT token successfully when auth and resources exist", async () => {
        const authId = "valid-auth-id";
        const payload: AuthGenerateTokenQueryPayload = { authId };

        const mockAuth: AuthModel = {
            authEmail: "user@example.com",
            authLastname: "Doe",
            authName: "John",
            logo: "logo-id",
            authId,
        } as AuthModel;

        const mockResources: AuthResourceModel[] = [
            { resourceAddress: "resource1", resourceIcon: "icon1", resourceLabel: "label1" },
            { resourceAddress: "resource2", resourceIcon: "icon2", resourceLabel: "label2" },
        ] as unknown as AuthResourceModel[];

        authRepository.findOneAsync.mockResolvedValue(mockAuth);
        resourceRepository.findManyAsync.mockResolvedValue(mockResources);
        jwtProvider.createJwt.mockReturnValue("signed-jwt-token");

        const result = await query.handleAsync(payload);

        expect(authRepository.findOneAsync).toHaveBeenCalledWith([{ field: 'authId', operator: 'eq', value: authId }]);
        expect(resourceRepository.findManyAsync).toHaveBeenCalledWith({ filter: [{ field: 'authId', operator: 'eq', value: authId }] });
        expect(jwtProvider.createJwt).toHaveBeenCalledWith({
            email: mockAuth.authEmail,
            lastname: mockAuth.authLastname,
            name: mockAuth.authName,
            logo: mockAuth.logo,
            resources: mockResources.map(e => ({
                address: e.resourceAddress,
                icon: e.resourceIcon,
                label: e.resourceLabel
            })),
            sub: mockAuth.authId,
        });

        expect(result).toBe("signed-jwt-token");
    });

    it("should throw AuthNotFoundError when auth does not exist", async () => {
        const authId = "invalid-auth-id";
        const payload: AuthGenerateTokenQueryPayload = { authId };

        authRepository.findOneAsync.mockResolvedValue(null);

        await expect(query.handleAsync(payload)).rejects.toThrow(AuthNotFoundError);
    });
});

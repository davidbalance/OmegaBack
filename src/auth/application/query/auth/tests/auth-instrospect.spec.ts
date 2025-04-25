/* eslint-disable @typescript-eslint/unbound-method */
import { JwtProvider } from "@shared/shared/providers/jwt.provider";
import { AuthIntrospectQuery, AuthIntrospectQueryImpl, AuthIntrospectQueryPayload } from "../auth-introspect.query";
import { AuthJwtPayload } from "@omega/auth/application/type/auth.type";

describe("AuthIntrospectQuery", () => {
    let jwtProvider: jest.Mocked<JwtProvider>;
    let query: AuthIntrospectQuery;

    beforeEach(() => {
        jwtProvider = {
            validateJwt: jest.fn(),
        } as unknown as jest.Mocked<JwtProvider>;

        query = new AuthIntrospectQueryImpl(jwtProvider);
    });

    it("should return an active introspection when JWT is valid", async () => {
        const mockPayload: AuthJwtPayload = { sub: "user-123", role: "admin" } as unknown as AuthJwtPayload;
        jwtProvider.validateJwt.mockReturnValue(mockPayload);

        const payload: AuthIntrospectQueryPayload = { jwt: "valid.jwt.token" };
        const result = await query.handleAsync(payload);

        expect(result).toEqual({ ...mockPayload, active: true });
        expect(jwtProvider.validateJwt).toHaveBeenCalledWith(payload.jwt);
    });

    it("should return an inactive introspection when JWT is invalid", async () => {
        jwtProvider.validateJwt.mockImplementation(() => { throw new Error("Invalid token"); });

        const payload: AuthIntrospectQueryPayload = { jwt: "invalid.jwt.token" };
        const result = await query.handleAsync(payload);

        expect(result).toEqual({ active: false });
        expect(jwtProvider.validateJwt).toHaveBeenCalledWith(payload.jwt);
    });
});

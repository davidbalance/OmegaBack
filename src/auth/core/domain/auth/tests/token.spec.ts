import { Token } from "../token.domain";

describe("Token Entity", () => {
    let token: Token;

    beforeEach(() => {
        token = Token.create({ authId: "auth-123", token: "secure-token" });
    });

    it("should create a Token instance with correct initial state", () => {
        expect(token.authId).toEqual("auth-123");
        expect(token.token).toEqual("secure-token");
    });

    it("should rehydrate a Token entity with given properties", () => {
        const rehydrated = Token.rehydrate({
            id: "token-456",
            authId: "auth-789",
            token: "rehydrated-token"
        });

        expect(rehydrated.id).toEqual("token-456");
        expect(rehydrated.authId).toEqual("auth-789");
        expect(rehydrated.token).toEqual("rehydrated-token");
    });

    it("should validate a matching token", () => {
        expect(token.validate("secure-token")).toBeTruthy();
    });

    it("should return false for a non-matching token", () => {
        expect(token.validate("wrong-token")).toBeFalsy();
    });
});

import { Email } from "../email.domain";

describe("Email Entity", () => {
    let email: Email;

    beforeEach(() => {
        email = Email.create({
            clientId: "client-id",
            email: "test@example.com",
            default: false
        });
    });

    test("should create an email entity", () => {
        expect(email.clientId).toBe("client-id");
        expect(email.email).toBe("test@example.com");
        expect(email.default).toBe(false);
    });

    test("should rehydrate an email entity", () => {
        const emailId = crypto.randomUUID();
        const rehydrate = Email.rehydrate({
            id: emailId,
            clientId: "client-id",
            email: "test@example.com",
            default: false
        });
        expect(rehydrate.id).toBe(emailId);
        expect(rehydrate.clientId).toBe("client-id");
        expect(rehydrate.email).toBe("test@example.com");
        expect(rehydrate.default).toBeFalsy();
    });

    test("should set email as default", () => {
        email.addDefault();
        expect(email.default).toBe(true);
    });

    test("should remove default from email", () => {
        email.addDefault();
        email.removeDefault();
        expect(email.default).toBe(false);
    });
});
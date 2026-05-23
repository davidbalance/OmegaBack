import { Record } from "../record.domain";

describe("Record Entity", () => {
    let email: Record;

    beforeEach(() => {
        email = Record.create({
            clientId: "client-id",
            filepath: '/path/to/record.pdf',
            name: 'record'
        });
    });

    test("should create an email entity", () => {
        expect(email.clientId).toBe("client-id");
        expect(email.filepath).toBe("/path/to/record.pdf");
        expect(email.name).toBe('record');
    });

    test("should rehydrate an email entity", () => {
        const recordId = crypto.randomUUID();
        const rehydrate = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '/path/to/record.pdf',
            name: 'record',
            createAt: new Date()
        });
        expect(rehydrate.id).toBe(recordId);
        expect(rehydrate.clientId).toBe("client-id");
        expect(email.filepath).toBe("/path/to/record.pdf");
        expect(email.name).toBe('record');
    });
});
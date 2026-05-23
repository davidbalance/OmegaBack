import { Client } from "../client.domain";
import { EmailConflictError, EmailNotFoundError } from "../errors/email.errors";
import { EditClientPayload } from "../payloads/client.payloads";

describe("Client Aggregate", () => {
    let client: Client;

    beforeEach(() => {
        client = Client.create({
            patientDni: "12345678",
            patientName: "John",
            patientLastname: "Doe",
            patientGender: "male",
            patientRole: "User",
            patientBirthday: new Date("2000-01-01")
        });
    });

    it('should create a client', () => {
        expect(client.patientDni).toBe('12345678');
        expect(client.patientName).toBe('John');
        expect(client.patientLastname).toBe('Doe');
        expect(client.patientGender).toBe('male');
    });

    it('should rehydrate a client', () => {
        const rehydratedClient = Client.rehydrate({
            id: 'client-id',
            patientDni: '12345678',
            patientName: 'John',
            patientLastname: 'Doe',
            patientGender: 'male',
            patientBirthday: new Date('1990-01-01'),
            email: [],
            records: [],
            managementId: null,
            managementName: null,
            areaId: null,
            areaName: null,
        });

        expect(rehydratedClient.patientDni).toBe('12345678');
        expect(rehydratedClient.patientName).toBe('John');
        expect(rehydratedClient.patientLastname).toBe('Doe');
    });

    test("should add an email to the client", () => {
        client.addEmail("test@example.com");
        expect(client.email).toHaveLength(1);
        expect(client.email[0].email).toBe("test@example.com");
    });

    test("should edit the client", () => {
        const payload: EditClientPayload = { patientGender: "male" };
        client.edit(payload);
        expect(client.patientGender).toBe("male");
    });

    test("should not add duplicate emails", () => {
        client.addEmail("test@example.com");
        expect(() => client.addEmail("test@example.com")).toThrow(EmailConflictError);
    });

    test("first added email should be default", () => {
        client.addEmail("test@example.com");
        expect(client.email[0].default).toBe(true);
    });

    test("should set a new default email", () => {
        client.addEmail("first@example.com");
        client.addEmail("second@example.com");
        const secondEmailId = client.email[1].id;
        client.addDefaultEmail(secondEmailId);

        expect(client.email[0].default).toBe(false);
        expect(client.email[1].default).toBe(true);
    });

    test("should throw error when setting a default email that does not exist", () => {
        expect(() => client.addDefaultEmail("non-existent-id")).toThrow(EmailNotFoundError);
    });

    test("should remove an email", () => {
        client.addEmail("test@example.com");
        const emailId = client.email[0].id;
        client.removeEmail(emailId);
        expect(client.email).toHaveLength(0);
    });

    test("should throw error when removing a non-existent email", () => {
        expect(() => client.removeEmail("non-existent-id")).toThrow(EmailNotFoundError);
    });

    test("should add a new record to the client", () => {
        client.addRecord({ filepath: '/path/to/record.pdf', name: 'record' });
        expect(client.records).toHaveLength(1);
    });
});

import { InternalError } from "@shared/shared/domain/error";
import { User } from "../user.domain";

describe('User Aggregate', () => {
    let user: User;

    beforeEach(() => {
        user = User.create({
            dni: '1234567890',
            name: 'John',
            lastname: 'Doe',
            email: "stub@email.com"
        });
    });

    it('should get the correct initial state', () => {
        expect(user.name).toEqual('John');
        expect(user.lastname).toEqual('Doe');
        expect(user.dni).toEqual('1234567890');
        expect(user.attributes).toEqual([]);
        expect(user.doctor).toBeNull();
        expect(user.patient).toBeNull();
        expect(user.auth).toBeNull();
    });

    it('should add auth to the user', () => {
        user.addAuth('some-auth-token');
        expect(user.auth).toEqual('some-auth-token');
    });

    it('should remove auth from the user', () => {
        user.addAuth('some-auth-token');
        user.removeAuth();
        expect(user.auth).toBeNull();
    });

    it('should add a new attribute to the user', () => {
        user.addAttribute({
            attributeName: 'age',
            attributeValue: '30',
        });
        expect(user.attributes.length).toBe(1);
        expect(user.attributes[0].name).toEqual('age');
        expect(user.attributes[0].value).toContain('30');
    });

    it('should update an existing attribute value for the user', () => {
        user.addAttribute({
            attributeName: 'age',
            attributeValue: '30',
        });
        user.addAttribute({
            attributeName: 'age',
            attributeValue: '31',
        });
        expect(user.attributes.length).toBe(1);
        expect(user.attributes[0].value).toContain('31');
    });

    it('should remove an attribute from the user', () => {
        user.addAttribute({
            attributeName: 'age',
            attributeValue: '30',
        });
        const attributeId = user.attributes[0].id;
        user.removeAttribute(attributeId);
        expect(user.attributes.length).toBe(0);
    });

    it('should add a patient to the user', () => {
        user.addPatient({
            gender: 'female',
            birthday: new Date('1995-02-02'),
        });
        expect(user.patient).toBeDefined();
        expect(user.patient?.userId).toEqual(user.id);
    });

    it('should throw error when trying to add a patient if already has one', () => {
        user.addPatient({
            gender: 'female',
            birthday: new Date('1995-02-02'),
        });
        expect(() => {
            user.addPatient({
                gender: 'male',
                birthday: new Date('1990-10-10'),
            });
        }).toThrow(InternalError);
    });

    it('should add a doctor to the user', () => {
        user.addDoctor();
        expect(user.doctor).toBeDefined();
    });

    it('should throw error when trying to add a doctor if already has one', () => {
        user.addDoctor();
        expect(() => {
            user.addDoctor();
        }).toThrow(InternalError);
    });

    it('should rehydrate a user', () => {
        const userId = crypto.randomUUID();
        const rehydrated = User.rehydrate({
            id: userId,
            dni: '1234567890',
            name: 'John',
            lastname: 'Doe',
            attributes: [],
            doctor: undefined,
            patient: undefined,
            auth: undefined,
            email: "stub@email.com"
        });

        expect(rehydrated.id).toEqual(userId);
        expect(rehydrated.name).toEqual('John');
        expect(rehydrated.lastname).toEqual('Doe');
        expect(rehydrated.dni).toEqual('1234567890');
        expect(rehydrated.attributes).toEqual([]);
        expect(rehydrated.doctor).toBeUndefined();
        expect(rehydrated.patient).toBeUndefined();
        expect(rehydrated.auth).toBeUndefined();
    });
});

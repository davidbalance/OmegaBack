import { Patient } from "../patient.domain";

describe('Patient Entity', () => {
    let patient: Patient;

    beforeEach(() => {
        patient = Patient.create({
            userId: 'User1',
            gender: 'male',
            birthday: new Date('1990-01-01')
        });
    });

    it('should get the correct initial state', () => {
        expect(patient.userId).toEqual('User1');
        expect(patient.gender).toEqual('male');
        expect(patient.birthday).toEqual(new Date('1990-01-01'));
    });

    it('should create a patient with a random ID', () => {
        const newPatient = Patient.create({
            userId: 'User2',
            gender: 'female',
            birthday: new Date('1985-05-15')
        });
        expect(newPatient.id).toBeDefined();
        expect(newPatient.userId).toEqual('User2');
        expect(newPatient.gender).toEqual('female');
        expect(newPatient.birthday).toEqual(new Date('1985-05-15'));
    });

    it('should rehydrate', () => {
        const patientId = crypto.randomUUID();
        const rehydrated = Patient.rehydrate({
            id: patientId,
            userId: 'User1',
            gender: 'male',
            birthday: new Date('1990-01-01')
        });

        expect(rehydrated.id).toEqual(patientId);
        expect(rehydrated.userId).toEqual('User1');
        expect(rehydrated.gender).toEqual('male');
        expect(rehydrated.birthday).toEqual(new Date('1990-01-01'));
    });
});

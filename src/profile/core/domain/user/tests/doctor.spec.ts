import { Doctor } from "../doctor.domain";

describe('Doctor Entity', () => {
    let doctor: Doctor;

    beforeEach(() => {
        doctor = Doctor.create({ userId: 'User1', signature: 'Dr. Smith' });
    });

    it('should get the correct initial state', () => {
        expect(doctor.userId).toEqual('User1');
        expect(doctor.signature).toEqual('Dr. Smith');
        expect(doctor.hasFile).toBeFalsy();
    });
    
    it('should add a file to the doctor', () => {
        doctor.addFile();
        expect(doctor.hasFile).toBeTruthy();
    });

    it('should rehydrate', () => {
        const doctorId = crypto.randomUUID();
        const rehydrated = Doctor.rehydrate({
            id: doctorId,
            userId: 'User1',
            signature: 'Dr. Smith',
            hasFile: true
        });

        expect(rehydrated.id).toEqual(doctorId);
        expect(rehydrated.userId).toEqual('User1');
        expect(rehydrated.signature).toEqual('Dr. Smith');
    });
});

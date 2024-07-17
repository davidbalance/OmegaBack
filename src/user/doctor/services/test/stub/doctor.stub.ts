import { Doctor } from "@/user/doctor/entities/doctor.entity";
import { mockUser } from "@/user/user/services/test/stub/user-management.stub";

const stubDoctor = (id: number): Doctor => ({
    id: id,
    hasFile: false,
    user: mockUser,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockDoctor: Doctor = stubDoctor(1);
export const mockDoctors: Doctor[] = [1, 2, 3, 4, 5].map(stubDoctor);
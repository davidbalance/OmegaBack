import { MedicalOrderDoctor } from "../dtos/response/medical-order-doctor.base.dto";

const stubMedicalOrderDoctor = (id: number): MedicalOrderDoctor => ({
    id: id,
    leftReports: 10,
    process: "Stub process",
    createAt: new Date(),
    orderStatus: "created",
    hasFile: false
});

export const mockMedicalOrderDoctor = () => stubMedicalOrderDoctor(1);
export const mockMedicalOrderDoctors = () => Array(20).map(stubMedicalOrderDoctor);
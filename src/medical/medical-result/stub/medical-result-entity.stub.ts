import { MedicalOrderEntity } from "@/medical/medical-order/entities/medical-order.entity";
import { MedicalReportEntity } from "@/medical/medical-report/entities/medical-report.entity";
import { MedicalResultExternalKeyEntity } from "../entities/medical-result-external-key.entity";
import { MedicalResultEntity } from "../entities/medical-result.entity";

const stubMedicalResultEntity = (id: number): MedicalResultEntity => ({
    id: id,
    hasFile: false,
    diseases: [{ id: 1 } as any],
    examType: "Test type",
    examSubtype: "Test subtype",
    examName: "Test exam",
    doctorDni: "1234567890",
    doctorFullname: "Doctor",
    doctorSignature: "Lastname",
    order: {} as MedicalOrderEntity,
    report: {} as MedicalReportEntity,
    externalKey: {} as MedicalResultExternalKeyEntity,
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockMedicalResultEntity = () => stubMedicalResultEntity(1);
export const mockMedicalResultEntities = () => Array(20).map(stubMedicalResultEntity);
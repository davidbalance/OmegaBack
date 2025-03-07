import { CompanyRecord, MedicalConsultation, MedicalDiagnostic, MedicalRecommendation, PatientRecord, PhysicalRegionalExam, RecordType, VitalSignsAndAnthropometry } from "./record.type";

type CompanyAndPatientData = {
    company: CompanyRecord;
    healthFacility: string;
    patient: PatientRecord & { age: number; };
    jobPosition: string;
    lastWorkingDate: Date;
    reintegrationDate: Date;
    totalDays: number;
    leftCause: string;
}

type ExamResult = {
    exam: string;
    date: Date;
    result: string;
}

export type ReintegrateRecord = RecordType<'reintegrar'> & {
    institution: CompanyAndPatientData;
    medicalConsultation: MedicalConsultation;
    currentDisease: { description: string; };
    vitalSignsAndAnthropometry: VitalSignsAndAnthropometry;
    physicalRegionalExam: PhysicalRegionalExam & { observation: string; };
    examResults: ExamResult[];
    diagnostics: MedicalDiagnostic[];
    recommendation: MedicalRecommendation;
}
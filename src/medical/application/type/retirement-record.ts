import { CompanyRecord, GeneralExamResult, JobAccident, MedicalConsultation, MedicalDiagnostic, MedicalRecommendation, OccupationalDisease, PatientRecord, PhysicalRegionalExam, RecordType, VitalSignsAndAnthropometry } from "./record.type";

type CompanyAndPatientData = {
    company: CompanyRecord;
    healthFacility: string;
    patient: PatientRecord;
    workStartDate: Date;
    endDate: Date;
    time: number;
    jobPosition: string;
    activities: { activity: string; risk: string; }[];
}

type PatientHistory = {
    medicalAndSurgicalHistory: { description: string; };
    jobAccident: JobAccident;
    occupationalDisease: OccupationalDisease;
}

type MedicalRetirementEvaluation = {
    done: boolean;
    observation: string;
}

export type RetirementRecord = RecordType<'retirement'> & {
    institution: CompanyAndPatientData;
    medicalConsultation: MedicalConsultation;
    patientHistory: PatientHistory;
    vitalSignsAndAnthropometry: VitalSignsAndAnthropometry;
    physicalRegionalExam: PhysicalRegionalExam & {
        observation: string;
    };
    generalExamResult: {
        results: GeneralExamResult[];
        observation: string;
    }
    diagnostics: MedicalDiagnostic[];
    medicalEvaluation: MedicalRetirementEvaluation;
    recommendation: MedicalRecommendation;
}
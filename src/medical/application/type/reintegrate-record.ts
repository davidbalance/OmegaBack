import { CompanyRecord, CurrentDisease, GeneralExamResultAndSpecific, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, PatientRecord, PhysicalRegionalExam, RecordRecommendation, RecordType, VitalSignsAndAnthropometry } from "./record.type";

export type ExamResult = {
    exam: string;
    date: Date;
    result: string;
}

export type ReintegrateRecord = RecordType<'reintegrar'> & PatientRecord & CompanyRecord & MedicalConsultation &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & GeneralExamResultAndSpecific & MedicalFitnessForJob &
    CurrentDisease & RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        jobPosition: string;
        workingEndDate: Date;
        workingReintegrationDate: Date;
        workingTime: number;
        workingLeftCause: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    }
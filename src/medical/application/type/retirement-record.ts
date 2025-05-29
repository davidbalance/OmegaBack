import { CompanyRecord, GeneralExamResultAndSpecific, InstitutionHealthRecord, JobAccident, MedicalAndSurgicalHistory, MedicalDiagnostic, OccupationalDisease, PatientRecord, PhysicalRegionalExam, RecordRecommendation, RecordType, VitalSignsAndAnthropometry } from "./record.type";

export type RetirementInstitutionActivity = {
    activity: string;
    risk: string;
}

export type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationObservation?: string;
}

export type RetirementRecord = RecordType<'retiro'>
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // Patient history
    & MedicalAndSurgicalHistory
    & JobAccident
    & OccupationalDisease
    // Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // Physical Regional Exam
    & PhysicalRegionalExam
    // General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // Retirement Evaluation
    & RetirementEvaluation
    // Recommendation
    & RecordRecommendation
    & {
        /* --------------------------------------------------- Institution & Patient Information --------------------------------------------------- */
        institutionActivities: RetirementInstitutionActivity[];
        workStartDate: Date;
        workingTime: number;
        workingEndDate: Date;
        jobPosition: string;

        /* --------------------------------------------------- Medical Consultation --------------------------------------------------- */
        medicalAndSurgicalHistory: string;

        /* --------------------------------------------------- Diagnostics --------------------------------------------------- */
        diagnostics: MedicalDiagnostic[];

        /* --------------------------------------------------- Medical Recommendations --------------------------------------------------- */
        recommendationDescription: string;
    }
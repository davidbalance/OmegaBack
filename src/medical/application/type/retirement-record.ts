import { CompanyRecord, GeneralExamResultAndSpecific, JobAccident, MedicalDiagnostic, OccupationalDisease, PatientRecord, PhysicalRegionalExam, RecordType, VitalSignsAndAnthropometry } from "./record.type";

export type RetirementInstitutionActivity = {
    activity: string;
    risk: string;
}

export type RetirementEvaluation = {
    retirementDone: boolean;
    retirementObservation: string;
}

export type RetirementRecord = RecordType<'retiro'> & PatientRecord & CompanyRecord &
    JobAccident & OccupationalDisease & GeneralExamResultAndSpecific & VitalSignsAndAnthropometry & PhysicalRegionalExam &
    RetirementEvaluation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        institutionActivities: RetirementInstitutionActivity[];
        workStartDate: Date;
        workingTime: number;
        workingEndDate: Date;
        jobPosition: string;

        /** Medical Consultation */
        medicalAndSurgicalHistory: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }
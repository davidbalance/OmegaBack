import { CompanyRecord, GeneralExam, JobAccident, MedicalDiagnostic, OccupationalDisease, PatientRecord, PhysicalRegionalExam, RecordType, VitalSignsAndAnthropometry } from "./record.type";

export type InstitutionActivity = {
    activity: string;
    risk: string;
}

export type RetirementEvaluation = {
    retirementDone: boolean;
    retirementobservation: string;
}

export type RetirementRecord = RecordType<'retiro'> & PatientRecord & CompanyRecord &
    JobAccident & OccupationalDisease & GeneralExam & VitalSignsAndAnthropometry & PhysicalRegionalExam &
    RetirementEvaluation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        institutionActivities: InstitutionActivity[];
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
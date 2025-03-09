import { CompanyRecord, MedicalDiagnostic, MedicalFitnessForJob, PatientRecord, PhysicalRegionalExam, RecordType, VitalSignsAndAnthropometry } from "./record.type";

export type ExamResult = {
    exam: string;
    date: Date;
    result: string;
}

export type ReintegrateRecord = RecordType<'reintegrar'> & PatientRecord & CompanyRecord &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        jobPosition: string;
        workingEndDate: Date;
        workingReintegrationDate: Date;
        workingTime: number;
        workingLeftCause: string;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Current disease */
        currentDiseaseDescription: string;

        /** ExamResults */
        examResults: ExamResult[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }
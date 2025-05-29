import { CompanyRecord, InstitutionHealthRecord, MedicalFitnessForJob, PatientRecord, RecordRecommendation, RecordType } from "./record.type";

export type GeneralData = {
    generalData: 'entry' | 'periodic' | 'reintegrate' | 'retirement'
};

export type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationCondition: 'presuntive' | 'definitive' | 'no-apply';
    retirementEvaluationConditionWithJob: 'yes' | 'no' | 'no-apply';
}

export type CertificateRecord = RecordType<'certificado'>
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // General Data
    & GeneralData
    // Medical Fitness for Job
    & Pick<MedicalFitnessForJob, 'medicalFitnessType' | 'medicalFitnessObservation'> // Only if general data is different to `retirement`
    // Retirement Evaluation
    & RetirementEvaluation // Only if general data is equals to `retirement`
    // Recommendation
    & RecordRecommendation
    & {
        /* -------------------------------- Institution & Patient Information -------------------------------- */
        jobPosition: string;
    }
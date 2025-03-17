import { CompanyRecord, MedicalFitnessForJob, PatientRecord, RecordRecommendation, RecordType } from "./record.type";

export type GeneralData = {
    generalData: 'entry' | 'periodic' | 'reintegrate' | 'retirement'
};

export type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationCondition: 'presuntive' | 'definitive' | 'no-apply';
    retirementEvaluationConditionWithJob: 'yes' | 'no' | 'no-apply';
}

export type CertificateRecord = RecordType<'certificado'> & PatientRecord & CompanyRecord &
    GeneralData & MedicalFitnessForJob & RetirementEvaluation &
    RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;
    }
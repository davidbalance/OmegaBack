import { CompanyRecord, MedicalFitnessForJob, PatientRecord, RecordRecommendation, RecordType } from "./record.type";

export enum GeneralDataEnum {
    ENTRY = 'entry',
    PERIODIC = 'periodic',
    REINTEGRATE = 'reintegrate',
    RETIREMENT = 'retirement',
}

export type GeneralData = {
    generalData: GeneralDataEnum
};

export enum EvaluationConditionEnum {
    PRESUNTIVE = 'presuntive',
    DEFINITIVE = 'definitive',
    NO_APPLY = 'no-apply'
}
export enum EvaluationConditionWithJobEnum {
    YES = 'yes',
    NO = 'no',
    NO_APPLY = 'no-apply'
}
export type RetirementEvaluation = {
    retirementEvaluationDone: boolean;
    retirementEvaluationCondition: EvaluationConditionEnum;
    retirementEvaluationConditionWithJob: EvaluationConditionWithJobEnum;
}

export type CertificateRecord = RecordType<'certificado'> & PatientRecord & CompanyRecord &
    GeneralData & MedicalFitnessForJob & RetirementEvaluation &
    RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;
    }
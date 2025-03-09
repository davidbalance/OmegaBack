import { CompanyRecord, MedicalFitnessForJob, PatientRecord, RecordType } from "./record.type";

type GeneralData = 'entry' | 'periodic' | 'reintegrate' | 'retirement'
type DiagnosticCondition = 'presumptive' | 'definitive' | 'no-apply';
type RetirementHealth = 'yes' | 'no' | 'no-apply';

export type CertficateRecord = RecordType<'certificado'> & PatientRecord & CompanyRecord
    & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition?: string;

        /** General data */
        generalDataEvaluation: GeneralData;

        /** Medical Retirement Evaluation */
        retirementEvaluationDone: boolean;
        retirementDiagnosticCondition: DiagnosticCondition;
        retirementHealth: RetirementHealth;

        /** Medical Recommendations */
        recommendationDescription: string;
    }
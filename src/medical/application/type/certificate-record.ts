import { CompanyRecord, MedicalFitnessForJob, MedicalRecommendation, PatientRecord, RecordType } from "./record.type";


type CompanyAndPatientData = {
    company: CompanyRecord;
    healthFacility: string;
    patient: PatientRecord;
    jobPosition: string;
}

type GeneralData = {
    evaluation: 'entry' | 'periodic' | 'reintegrate' | 'retirement';
}

type MedicalRetirementEvaluation = {
    evaluationHasDone: boolean;
    diagnosticCondition: 'presumptive' | 'definitive' | 'no-apply';
    jobHealth: 'yes' | 'no' | 'no-apply';
}

export type CertficateRecord = RecordType<'certificado'> & {
    institution: CompanyAndPatientData;
    generalData: GeneralData;
    medicalFitnessForJob: MedicalFitnessForJob;
    retirementEvaluation: MedicalRetirementEvaluation;
    recommendation: MedicalRecommendation;
}
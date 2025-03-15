import { BiologicalRisk, ChemicalRisk, CompanyRecord, CurrentDisease, ErgonomicRisk, FamilyHistory, GeneralExamResultAndSpecific, IndentRecord, JobAccident, LifeStyle, MechanicalRisk, MedicalAndSurgicalHistory, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PatientRecord, PhysicalRegionalExam, PhysicalRisk, PsychosocialRisk, RecordRecommendation, RecordType, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "./record.type";

export type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<Boolean>> & Partial<ChemicalRisk<boolean>> & Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalRiskOther?: string;
    biologicalRiskOther?: string;
    ergonomicRiskOther?: string;
}

export type JobRiskWithPreventiveMeasure = Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    months: number;
    psychosocialRiskOther?: string;
    preventiveMeasure: string;
}

export type PeriodicRecord = RecordType<'periodico'> & PatientRecord & CompanyRecord & MedicalConsultation & MedicalAndSurgicalHistory &
    LifeStyle & JobAccident & OccupationalDisease & FamilyHistory & IndentRecord &
    ReviewOfOrgansAndSystem & VitalSignsAndAnthropometry & PhysicalRegionalExam & CurrentDisease &
    GeneralExamResultAndSpecific & MedicalFitnessForJob & RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;

        /** Patient History */
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position Risks */
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    }
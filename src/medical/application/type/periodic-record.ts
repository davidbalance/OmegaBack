import { BiologicalRisk, ChemicalRisk, CompanyRecord, ErgonomicRisk, FamilyHistory, GeneralExam, JobAccident, LifeStyle, MechanicalRisk, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PatientRecord, PhysicalRegionalExam, PhysicalRisk, PsychosocialRisk, RecordType, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "./record.type";

export type JobRisk = {
    name: string;
    activity: string;
    months: number;
    physical: Record<PhysicalRisk, boolean> | { other: string };
    mechanic: Record<MechanicalRisk, boolean> | { other: string };
    chemical: Record<ChemicalRisk, boolean> | { other: string };
    biological: Record<BiologicalRisk, boolean> | { other: string };
    ergonomic: Record<ErgonomicRisk, boolean> | { other: string };
}

export type JobRiskWithPreventiveMeasure = {
    name: string;
    activity: string;
    months: number;
    psychosocial: Record<PsychosocialRisk, boolean> | { other: string };
    preventiveMeasure: string;
}

export type PeriodicRecord = RecordType<'periodico'> & CompanyRecord & PatientRecord & LifeStyle &
    JobAccident & OccupationalDisease & GeneralExam & FamilyHistory & ReviewOfOrgansAndSystem & VitalSignsAndAnthropometry &
    PhysicalRegionalExam & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        jobPosition: string;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Patient History */
        medicalAndSurgicalHistory: string;
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;
        incidentDescription: string;

        /** Job Position Risks */
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Extra Activities & Diseases */
        currentDiseaseDescription: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    }
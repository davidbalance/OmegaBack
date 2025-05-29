import { BiologicalRisk, ChemicalRisk, CompanyRecord, CurrentDisease, ErgonomicRisk, FamilyHistory, GeneralExamResultAndSpecific, IncidentRecord, InstitutionHealthRecord, JobAccident, LifeStyle, MechanicalRisk, MedicalAndSurgicalHistory, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PatientRecord, PhysicalRegionalExam, PhysicalRisk, PsychosocialRisk, RecordRecommendation, RecordType, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "./record.type";

export type JobRisk = Partial<PhysicalRisk<boolean>>
    & Partial<MechanicalRisk<Boolean>>
    & Partial<ChemicalRisk<boolean>>
    & Partial<BiologicalRisk<boolean>>
    & Partial<ErgonomicRisk<boolean>>
    & Partial<PsychosocialRisk<boolean>>
    & {
        name: string;
        activity: string;
        months: number;
        physicalRiskOther?: boolean;
        mechanicRiskOther?: boolean;
        chemicalRiskOther?: boolean;
        biologicalRiskOther?: boolean;
        ergonomicRiskOther?: boolean;
        psychosocialRiskOther?: boolean;
        preventiveMeasure: string;
    }

export type PeriodicRecord = RecordType<'periodico'>
    // Institution & Patient Information
    & InstitutionHealthRecord
    & CompanyRecord
    & PatientRecord
    // Medical Consultation
    & MedicalConsultation
    // Patient History
    & MedicalAndSurgicalHistory
    & LifeStyle
    & IncidentRecord
    & JobAccident
    & OccupationalDisease
    // Family history
    & FamilyHistory
    // Current Disease
    & CurrentDisease
    // Review of Organs and System
    & ReviewOfOrgansAndSystem
    // Vital Signs and Anthropometry
    & VitalSignsAndAnthropometry
    // Physical Regional Exam
    & PhysicalRegionalExam
    // General Exam Result and Specific
    & GeneralExamResultAndSpecific
    // Medical Fitness for Job
    & MedicalFitnessForJob
    // Record Recommendation
    & RecordRecommendation
    & {
        /* ---------------------------- Institution & Patient Information ---------------------------- */
        jobPosition: string;

        /* ---------------------------- Patient History ---------------------------- */
        toxicHabitTobacco: ToxicDetail;
        toxicHabitAlcohol: ToxicDetail;
        toxicHabitOther: ToxicDetail;

        /* ---------------------------- Job Position Risks ---------------------------- */
        jobRisks: JobRisk[];

        /* ---------------------------- Diagnostics ---------------------------- */
        diagnostics: MedicalDiagnostic[];
    }
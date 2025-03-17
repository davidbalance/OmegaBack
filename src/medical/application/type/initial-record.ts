import { BiologicalRisk, ChemicalRisk, CompanyRecord, CurrentDisease, ErgonomicRisk, ExtraActivity, FamilyHistory, GeneralExamResultAndSpecific, JobAccident, LifeStyle, MechanicalRisk, MedicalAndSurgicalHistory, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PatientRecord, PhysicalRegionalExam, PhysicalRisk, PsychosocialRisk, RecordRecommendation, RecordType, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "./record.type";

type ReligionRecord = "catholic" | "evangelical" | "jehovah's witnesses" | "mormon" | "other";
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual' | 'unknown';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male' | 'unknown';

export type ExamHistoryResult = {
    done: boolean;
    time?: number;
    result?: string;
};

export type GynecologicalHistory = {
    gynecologicalMenarche: string;
    gynecologicalCycle: string;
    gynecologicalLastMenstruationDate: Date;
    gynecologicalDeeds: number;
    gynecologicalBirths: number;
    gynecologicalCesarean: number;
    gynecologicalAbortions: number;
    gynecologicalDeadChildren: number;
    gynecologicalLivingChildren: number;
    gynecologicalSexualLife: boolean;
    gynecologicalFamilyPlanningType?: string;
    gynecologicalExamPapanicolau: ExamHistoryResult;
    gynecologicalExamColposcopy: ExamHistoryResult;
    gynecologicalExamBreastEcho: ExamHistoryResult;
    gynecologicalExamMammography: ExamHistoryResult;
};

export type MaleReproductiveHistory = {
    maleReproductiveExamProstateAntigen: ExamHistoryResult;
    maleReproductiveExamProstateEcho: ExamHistoryResult;
    maleReproductiveFamilyPlanningType?: string;
    maleReproductiveDeadChildren: number;
    maleReproductiveLivingChildren: number;
};

export type JobInformation = {
    jobStartDate: Date;
    jobPosition: string;
    jobArea: string;
    jobActivity: string;
};

export type JobHistory = {
    lastJobCompany: string;
    lastJobPosition: string;
    lastJobActivity: string;
    lastJobTime: number;
    lastJobRiskPhysical: boolean;
    lastJobRiskMechanical: boolean;
    lastJobRiskChemical: boolean;
    lastJobRiskBiological: boolean;
    lastJobRiskErgonomic: boolean;
    lastJobRiskPsychosocial: boolean;
    lastJobObservation: string;
}

export type JobRisk = Partial<PhysicalRisk<boolean>> & Partial<MechanicalRisk<boolean>> & Partial<ChemicalRisk<boolean>> & {
    name: string;
    activity: string;
    physicalRiskOther?: string;
    mechanicRiskOther?: string;
    chemicalRiskOther?: string;
}

export type JobRiskWithPreventiveMeasure = Partial<BiologicalRisk<boolean>> & Partial<ErgonomicRisk<boolean>> & Partial<PsychosocialRisk<boolean>> & {
    name: string;
    activity: string;
    biologicalRiskOther?: string;
    ergonomicRiskOther?: string;
    psychosocialRiskOther?: string;
    preventiveMeasure: string;
}

export type InitialRecord = RecordType<'inicial'> & PatientRecord & CompanyRecord & MedicalConsultation & MedicalAndSurgicalHistory &
    JobInformation & LifeStyle & JobAccident & GeneralExamResultAndSpecific & OccupationalDisease &
    FamilyHistory & GynecologicalHistory & MaleReproductiveHistory & ReviewOfOrgansAndSystem &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & ExtraActivity & CurrentDisease & GeneralExamResultAndSpecific & MedicalFitnessForJob &
    RecordRecommendation & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        patientReligion: ReligionRecord;
        patientOtherReligion?: string;
        patientBloodType: string;
        patientLaterality: string;
        patientSexualOrientation: SexualOrientation;
        patientGenderIdentity: GenderIdentity;
        patientDisabilityType?: string;
        patientDisabilityPercent?: number;

        /** Patient History */
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position History */
        jobHistory: JobHistory[];
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];
    };
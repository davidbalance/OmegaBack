import {
    BiologicalRisk,
    ChemicalRisk,
    CompanyRecord,
    ErgonomicRisk,
    FamilyHistory,
    GeneralExam,
    JobAccident,
    LifeStyle,
    MechanicalRisk,
    MedicalDiagnostic,
    MedicalFitnessForJob,
    OccupationalDisease,
    PatientRecord,
    PhysicalRegionalExam,
    PhysicalRisk,
    PsychosocialRisk,
    RecordType,
    ReviewOfOrgansAndSystem,
    ToxicDetail,
    VitalSignsAndAnthropometry
} from "./record.type";

type Religion = 'catholic' | 'evangelical' | "jehovah's witnesses" | 'mormon' | 'other';
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual' | 'other';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male' | 'other';
type GynecologicalExam = 'prostateAntigen' | 'colposcopy' | 'breastEcho' | 'mammography';
type MaleReproductiveExam = 'prostateAntigen' | 'prostateEcho';

export type ExamHistoryResult = {
    done: boolean;
    time: number;
    result: string;
};

export type GynecologicalHistory = {
    gynecologicalMenarche: string;
    gynecologicalCycle: string;
    gynecologicalLastMenstruationDate: Date;
    gynecologicalDeeds: string;
    gynecologicalBirths: string;
    gynecologicalCesarean: string;
    gynecologicalAbortions: string;
    gynecologicalDeadChildren: number;
    gynecologicalLivingChildren: number;
    gynecologicalSexualLife: boolean;
    gynecologicalFamilyPlanningType?: string;
    gynecologicalExam: Record<GynecologicalExam, ExamHistoryResult>;
};

export type MaleReproductiveHistory = {
    maleReproductiveExam: Record<MaleReproductiveExam, ExamHistoryResult>;
    maleReproductiveFamilyPlanningType?: string;
};

export type JobInformation = {
    jobStartDate: Date;
    jobPosition: string;
    jobArea: string;
    jobActivity: string;
}

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

export type JobRisk = {
    name: string;
    activity: string;
    physical: Record<PhysicalRisk, boolean> | { other: string };
    mechanic: Record<MechanicalRisk, boolean> | { other: string };
    chemical: Record<ChemicalRisk, boolean> | { other: string };
}

export type JobRiskWithPreventiveMeasure = {
    name: string;
    activity: string;
    biological: Record<BiologicalRisk, boolean> | { other: string };
    ergonomic: Record<ErgonomicRisk, boolean> | { other: string };
    phychosocial: Record<PsychosocialRisk, boolean> | { other: string };
    preventiveMeasure: string;
}

export type InitialRecord = RecordType<'initial'> & PatientRecord & CompanyRecord &
    JobInformation & LifeStyle & JobAccident & GeneralExam & OccupationalDisease & JobHistory &
    FamilyHistory & GynecologicalHistory & MaleReproductiveHistory & ReviewOfOrgansAndSystem &
    VitalSignsAndAnthropometry & PhysicalRegionalExam & MedicalFitnessForJob & {
        /** Institution & Patient Information */
        institutionHealthFacility: string;
        patientAge: number;
        patientReligion: Religion;
        patientOtherReligion?: string;
        patientBloodType: string;
        patientLaterality: string;
        patientSexualOrientation: SexualOrientation;
        patientOtherSexualOrientation?: string;
        patientGenderIdentity: GenderIdentity;
        patientOtherGenderIdentity?: string;
        patientDisabilityType?: string;
        patientDisabilityPercent?: number;

        /** Medical Consultation */
        medicalConsultationDescription: string;

        /** Patient History */
        medicalAndSurgicalHistory: string;
        toxicHabitTobacco?: ToxicDetail;
        toxicHabitAlcohol?: ToxicDetail;
        toxicHabitOther?: ToxicDetail;

        /** Job Position Risks */
        jobRisks: JobRisk[];
        jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasure[];

        /** Extra Activities & Diseases */
        extraActivityDescription: string;
        currentDiseaseDescription: string;

        /** Diagnostics */
        diagnostics: MedicalDiagnostic[];

        /** Medical Recommendations */
        recommendationDescription: string;
    };

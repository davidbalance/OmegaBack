import {
    BiologicalRisk,
    ChemicalRisk,
    CompanyRecord,
    ErgonomicRisk,
    FamilyHistory,
    GeneralExamResult,
    JobAccident,
    LifeStyle,
    MechanicalRisk,
    MedicalConsultation,
    MedicalDiagnostic,
    MedicalFitnessForJob,
    MedicalRecommendation,
    OccupationalDisease,
    PatientRecord,
    PhysicalRegionalExam,
    PhysicalRisk,
    PsychosocialRisk,
    RecordType,
    ReviewOfOrgansAndSystem,
    ToxicHabit,
    VitalSignsAndAnthropometry
} from "./record.type";

type Religion = 'catholic' | 'evangelical' | "jehovah's witnesses" | 'mormon';
type SexualOrientation = 'lesbian' | 'gay' | 'bisexual' | 'heterosexual';
type GenderIdentity = 'male' | 'female' | 'trans-female' | 'trans-male';

type CompanyAndPatientData = {
    company: CompanyRecord;
    healthFacility: string;
    patient: PatientRecord & {
        age: number;
        religion: Religion | { 'other': string };
        bloodType: string;
    };
    laterality: string;
    sexualOrientation: SexualOrientation | { 'other': string };
    genderIdentity: GenderIdentity | { 'other': string };
    disability?: { type: string; percent: number };
    workStartDate: Date;
    jobPosition: string;
    jobArea: string;
    jobActivity: string;
};

type FamilyPlanning = {
    methodUsed: boolean;
    methodType: string;
};

type ExamHistoryResult = {
    done: boolean;
    time: number;
    result: string;
};

type GynecologicalExam = 'prostateAntigen' | 'colposcopy' | 'breastEcho' | 'mammography';
type GynecologicalHistory = {
    menarche: string;
    cycle: string;
    lastMenstruationDate: Date;
    deeds: string;
    births: string;
    cesarean: string;
    abortions: string;
    deadChildren: number;
    livingChildren: number;
    sexualLife: boolean;
    familyPlanning?: FamilyPlanning;
    exam: Record<GynecologicalExam, ExamHistoryResult>;
};

type MaleReproductiveExam = 'prostateAntigen' | 'prostateEcho';
type MaleReproductiveHistory = {
    exam: Record<MaleReproductiveExam, ExamHistoryResult>;
    familyPlanning?: FamilyPlanning;
};

type PatientHistory = {
    medicalAndSurgicalHistory: { description: string };
    gynecologicalHistory: GynecologicalHistory;
    maleReproductiveHistory: MaleReproductiveHistory;
    toxicHabits: ToxicHabit;
    lifeStyle: LifeStyle;
};

type Risk = 'physical' | 'mechanical' | 'chemical' | 'biological' | 'ergonomic' | 'psychosocial';
type LastJobHistory = {
    companyName: string;
    jobPosition: string;
    activity: string;
    time: number;
    risk: Record<Risk, boolean>;
    observation: string;
};

type JobPositionHistory = {
    lastJobPositionHistory: LastJobHistory;
    jobAccident: JobAccident;
    occupationalDisease: OccupationalDisease;
}

type JobPositionRisk = {
    jobPosition: string;
    activity: string;
    physical: Record<PhysicalRisk, boolean> | { 'other': string };
    mechanic: Record<MechanicalRisk, boolean> | { 'other': string };
    chemical: Record<ChemicalRisk, boolean> | { 'other': string };
}

type JobPositionRiskWithPreventiveMeasure = {
    jobPosition: string;
    activity: string;
    biological: Record<BiologicalRisk, boolean> | { 'other': string };
    ergonomic: Record<ErgonomicRisk, boolean> | { 'other': string };
    phychosocial: Record<PsychosocialRisk, boolean> | { 'other': string };
    preventiveMeasure: string;
}

export type InitialRecord = RecordType<'inicial'> & {
    institution: CompanyAndPatientData;
    medicalConsultation: MedicalConsultation;
    patientHistory: PatientHistory;
    jobPositionHistory: JobPositionHistory[];
    familyHistory: Partial<FamilyHistory>;
    jobPositionRisk: {
        risks: JobPositionRisk[];
        riskWithPreventiveMeasure: JobPositionRiskWithPreventiveMeasure[];
    };
    extraActivity: { description: string };
    currentDisease: { description: string };
    reviewOfOrganAndSystems: ReviewOfOrgansAndSystem;
    vitalSignsAndAnthropometry: VitalSignsAndAnthropometry;
    physicalRegionalExam: PhysicalRegionalExam;
    generalExamResult: {
        results: GeneralExamResult[];
        observation: string;
    };
    diagnostics: MedicalDiagnostic[];
    medicalFitnessForJob: MedicalFitnessForJob;
    recommendation: MedicalRecommendation;
};
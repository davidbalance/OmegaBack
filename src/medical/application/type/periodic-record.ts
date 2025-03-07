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

type CompanyAndPatientData = {
    company: CompanyRecord;
    patient: PatientRecord;
    jobPosition: string;
}

type PatientHistory = {
    medicalAndSurgicalHistory: { description: string; };
    toxicHabits: ToxicHabit;
    lifeStyle: LifeStyle;
    incidents: { description: string; };
    jobAccident: JobAccident;
    occupationalDisease: OccupationalDisease;
}

type JobPositionRisk = {
    jobPosition: string;
    activity: string;
    months: number;
    physical: Record<PhysicalRisk, boolean> | { 'other': string };
    mechanic: Record<MechanicalRisk, boolean> | { 'other': string };
    chemical: Record<ChemicalRisk, boolean> | { 'other': string };
    biological: Record<BiologicalRisk, boolean> | { 'other': string };
    ergonomic: Record<ErgonomicRisk, boolean> | { 'other': string };
}

type JobPositionRiskWithPreventiveMeasure = {
    jobPosition: string;
    activity: string;
    months: number;
    phychosocial: Record<PsychosocialRisk, boolean> | { 'other': string };
    preventiveMeasure: string;
}

export type PeriodicRecord = RecordType<'periodico'> & {
    institution: CompanyAndPatientData;
    medicalConsultation: MedicalConsultation;
    patientHistory: PatientHistory;
    familyHistory: FamilyHistory;
    jobPositionRisk: {
        risks: JobPositionRisk[];
        riskWithPreventiveMeasure: JobPositionRiskWithPreventiveMeasure[];
    };
    currentDisease: { description: string; };
    reviewOfOrganAndSystems: ReviewOfOrgansAndSystem;
    vitalSignsAndAnthropometry: VitalSignsAndAnthropometry;
    physicalRegionalExam: PhysicalRegionalExam;
    generalExamResult: {
        results: GeneralExamResult[];
        observation: string;
    }
    diagnostics: MedicalDiagnostic[];
    medicalFitnessForJob: MedicalFitnessForJob;
    recommendation: MedicalRecommendation;
}
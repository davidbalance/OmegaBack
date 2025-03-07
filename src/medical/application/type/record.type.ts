export type RecordType<T = string> = {
    type: T
}

export type PatientRecord = {
    firstName: string;
    middleName: string;
    lastName: string;
    secondLastName: string;
    gender: 'male' | 'female';
};

export type CompanyRecord = {
    name: string;
    ruc: string;
    ciu: string;
};

export type MedicalConsultation = {
    description: string;
};

type ToxicDetail = {
    consumed: boolean;
    consumptionTime: number;
    quantity: number;
    consumer: boolean;
    timeOfAbstinence: number;
};

export type ToxicHabit = Record<'tobacco' | 'alcohol', ToxicDetail> | Record<string, ToxicDetail>;

export type LifeStyle = {
    physicalActivity: {
        active: boolean;
        type: string;
        duration: number;
    };
    currentMedication: {
        taking: boolean;
        medication: string;
        quantity: number;
        duration: number;
    };
};

export type JobAccident = {
    happened: boolean;
    description: string;
    date: string;
    observation: string;
};

export type OccupationalDisease = {
    happened: boolean;
    description: string;
    date: string;
    observation: string;
};

type FamilyDisease = 'cardio-vascular' | 'metabolic' | 'neurologic' | 'oncologic' | 'infectious' | 'hereditary' | 'disability';
export type FamilyHistory = Record<FamilyDisease, string>;

export type PhysicalRisk = 'high-temperature' | 'low-temperature' | 'ionic-radiation' | 'non-ionic-radiation' | 'noise' | 'vibration' | 'illumination' | 'ventilation' | 'electric-fluid';
export type MechanicalRisk = 'entrapment-between-machines' | 'trapping-between-surfaces' | 'entrapment-between-objects' | 'object-falling' | 'same-level-falling' | 'different-level-falling' | 'electric-contact' | 'surfaces-contact' | 'particles-projection' | 'fluid-projection' | 'jab' | 'cut' | 'hit-by-vehicles' | 'vehicle-collision';
export type ChemicalRisk = 'solid' | 'dust' | 'smoke' | 'liquid' | 'steam' | 'aerosol' | 'mist' | 'gas';
export type BiologicalRisk = 'virus' | 'fungus' | 'bacteria' | 'parasites' | 'exposure-to-vectors' | 'exposure-to-wildlife-animals';
export type ErgonomicRisk = 'manual-handling-loads' | 'repetitive-moves' | 'forced-postures' | 'work-with-pvd';
export type PsychosocialRisk = 'monotony' | 'work-overload' | 'thoroughness-of-the-task' | 'high-responsibility' | 'taking-responsibility-autonomy' | 'supervision' | 'role-conflict' | 'non-function-clarify' | 'bad-work-distribution' | 'rotative-shift' | 'intrapersonal-relations' | 'job-instability';

type OrganAndSystemDisease = 'skin' | 'sense-organs' | 'breath' | 'cardiovascular' | 'digestive' | 'urinary' | 'skeletal-muscle' | 'endocrinic' | 'hemo-lymphatic' | 'highly-strung';
export type ReviewOfOrgansAndSystem = Record<OrganAndSystemDisease, string>;

export type VitalSignsAndAnthropometry = {
    bloodPressure: number;
    temperature: number;
    heartRate: number;
    oxygenSaturation: number;
    respiratoryRate: number;
    weight: number;
    size: number;
    massIndex: number;
    abdominalPerimeter: number;
};

export type SkinExamResult = 'scar' | 'tattoo' | 'skin-lesions';
export type EyeExamResult = 'eyelids' | 'conjunctiva' | 'pupils' | 'corneas' | 'motility';
export type EarExamResult = 'c-auditory-external' | 'auricle' | 'eardrum';
export type PharynxExamResult = 'lips' | 'tongue' | 'pharynx' | 'tonsils' | 'teeth';
export type NoseExamResult = 'partition' | 'turbinates' | 'mucous-membranes' | 'paranasal-sinuses';
export type NeckExamResult = 'thyroid' | 'mobility';
export type ChestExamResult = 'breast' | 'heart' | 'lungs' | 'rib-cage';
export type AbdomenExamResult = 'viscera' | 'abdominal-wall';
export type ColumnExamResult = 'flexibility' | 'deviation' | 'pain';
export type PelvisExamResult = 'pelvis' | 'genitals';
export type LimbExamResult = 'vascular' | 'upper' | 'lower';
export type NeurologicExamResult = 'force' | 'sensitivity' | 'gait' | 'reflex';

export type PhysicalRegionalExam = {
    skin: Record<SkinExamResult, string>;
    eye: Record<EyeExamResult, string>;
    ear: Record<EarExamResult, string>;
    pharynx: Record<PharynxExamResult, string>;
    nose: Record<NoseExamResult, string>;
    neck: Record<NeckExamResult, string>;
    chest: Record<ChestExamResult, string>;
    abdomen: Record<AbdomenExamResult, string>;
    column: Record<ColumnExamResult, string>;
    pelvis: Record<PelvisExamResult, string>;
    limb: Record<LimbExamResult, string>;
    neurologic: Record<NeurologicExamResult, string>;
};

export type GeneralExamResult = {
    exam: string;
    date: Date;
    result: string;
};

export type MedicalDiagnostic = {
    description: string;
    cie: string;
    pre: boolean;
    def: boolean;
};

export type MedicalFitnessForJob = {
    type: 'fit' | 'fit-observation' | 'fit-limitation' | 'no-fit';
    observation: string;
    limitation: string;
};

export type MedicalRecommendation = {
    description: string;
};
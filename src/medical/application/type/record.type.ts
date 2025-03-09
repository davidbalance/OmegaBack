export type RecordType<T = string> = {
    type: T
}

export type PatientRecord = {
    patientFirstName: string;
    patientMiddleName: string;
    patientLastName: string;
    patientSecondLastName: string;
    patientGender: 'male' | 'female';
};

export type CompanyRecord = {
    companyName: string;
    companyRUC: string;
    companyCIU: string;
};

export type ToxicDetail = {
    consumed: boolean;
    consumptionTime: number;
    quantity: number;
    consumer: boolean;
    timeOfAbstinence: number;
};

export type LifeStyle = {
    lifestylePhysicalActivityActive: boolean;
    lifestylePhysicalActivityType?: string;
    lifestylePhysicalActivityDuration?: number;
    lifestyleMedicationTaking: boolean;
    lifestyleMedicationName?: string;
    lifestyleMedicationQuantity?: number;
    lifestyleMedicationDuration?: number;
};

export type JobAccident = {
    jobAccidentHappened: boolean;
    jobAccidentDescription?: string;
    jobAccidentDate?: Date;
    jobAccidentObservation?: string;
};

export type OccupationalDisease = {
    occupationalDiseaseHappened: boolean;
    occupationalDiseaseDescription?: string;
    occupationalDiseaseDate?: string;
    occupationalDiseaseObservation?: string;
};

export type GeneralExam = {
    generalExamResults: GeneralExamResult[];
    generalExamObservation: string;
}

/* type FamilyDisease = 'cardio-vascular' | 'metabolic' | 'neurologic' | 'oncologic' | 'infectious' | 'hereditary' | 'disability';
export type FamilyHistory = Record<FamilyDisease, string>; */

export type PhysicalRisk = 'high-temperature' | 'low-temperature' | 'ionic-radiation' | 'non-ionic-radiation' | 'noise' | 'vibration' | 'illumination' | 'ventilation' | 'electric-fluid';
export type MechanicalRisk = 'entrapment-between-machines' | 'trapping-between-surfaces' | 'entrapment-between-objects' | 'object-falling' | 'same-level-falling' | 'different-level-falling' | 'electric-contact' | 'surfaces-contact' | 'particles-projection' | 'fluid-projection' | 'jab' | 'cut' | 'hit-by-vehicles' | 'vehicle-collision';
export type ChemicalRisk = 'solid' | 'dust' | 'smoke' | 'liquid' | 'steam' | 'aerosol' | 'mist' | 'gas';
export type BiologicalRisk = 'virus' | 'fungus' | 'bacteria' | 'parasites' | 'exposure-to-vectors' | 'exposure-to-wildlife-animals';
export type ErgonomicRisk = 'manual-handling-loads' | 'repetitive-moves' | 'forced-postures' | 'work-with-pvd';
export type PsychosocialRisk = 'monotony' | 'work-overload' | 'thoroughness-of-the-task' | 'high-responsibility' | 'taking-responsibility-autonomy' | 'supervision' | 'role-conflict' | 'non-function-clarify' | 'bad-work-distribution' | 'rotative-shift' | 'intrapersonal-relations' | 'job-instability';

export type FamilyHistory = {
    familyHistoryCardioVascular?: string;
    familyHistoryMetabolic?: string;
    familyHistoryNeurologic?: string;
    familyHistoryOncologic?: string;
    familyHistoryInfectious?: string;
    familyHistoryHereditary?: string;
    familyHistoryDisability?: string;
    familyHistoryOther?: string;
}

export type ReviewOfOrgansAndSystem = {
    reviewOfOrgansSkin?: string;
    reviewOfOrgansSenseOrgans?: string;
    reviewOfOrgansBreath?: string;
    reviewOfOrgansCardiovascular?: string;
    reviewOfOrgansDigestive?: string;
    reviewOfOrgansUrinary?: string;
    reviewOfOrgansSkeletalMuscle?: string;
    reviewOfOrgansEndocrinic?: string;
    reviewOfOrgansHemoLymphatic?: string;
    reviewOfOrgansHighlyStrung?: string;
}

export type VitalSignsAndAnthropometry = {
    vitalSignsBloodPressure: number;
    vitalSignsTemperature: number;
    vitalSignsHeartRate: number;
    vitalSignsOxygenSaturation: number;
    vitalSignsRespiratoryRate: number;
    vitalSignsWeight: number;
    vitalSignsSize: number;
    vitalSignsMassIndex: number;
    vitalSignsAbdominalPerimeter: number;
};

export type PhysicalRegionalExam = {
    examSkinScar?: string;
    examSkinTattoo?: string;
    examSkinLesions?: string;
    examEyeEyelids?: string;
    examEyeConjunctiva?: string;
    examEyePupils?: string;
    examEyeCorneas?: string;
    examEyeMotility?: string;
    examEarAuditoryExternal?: string;
    examEarAuricle?: string;
    examEarEardrum?: string;
    examPharynxLips?: string;
    examPharynxTongue?: string;
    examPharynxPharynx?: string;
    examPharynxTonsils?: string;
    examPharynxTeeth?: string;
    examNosePartition?: string;
    examNoseTurbinates?: string;
    examNoseMucousMembranes?: string;
    examNoseParanasalSinuses?: string;
    examNeckThyroid?: string;
    examNeckMobility?: string;
    examChestBreast?: string;
    examChestHeart?: string;
    examChestLungs?: string;
    examChestRibCage?: string;
    examAbdomenViscera?: string;
    examAbdomenAbdominalWall?: string;
    examColumnFlexibility?: string;
    examColumnDeviation?: string;
    examColumnPain?: string;
    examPelvisGenitals?: string;
    examLimbVascular?: string;
    examLimbUpper?: string;
    examLimbLower?: string;
    examNeurologicForce?: string;
    examNeurologicSensitivity?: string;
    examNeurologicGait?: string;
    examNeurologicReflex?: string;
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
    medicalFitnessType: 'fit' | 'fit-observation' | 'fit-limitation' | 'no-fit';
    medicalFitnessObservation: string;
    medicalFitnessLimitation: string;
};
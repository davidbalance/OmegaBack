import { InitialRecord, ExamHistoryResult, JobRisk, JobRiskWithPreventiveMeasure } from "@omega/medical/application/type/initial-record";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessType, PatientRecordGender, ToxicDetailRequestDto } from "./_base.dto";

// Enums
enum ReligionType {
    CATHOLIC = 'catholic',
    EVANGELICAL = 'evangelical',
    JEHOVAHS_WITNESSESS = "jehovah's witnesses",
    MORMON = 'mormon',
    OTHER = 'other'
}

enum SexualOrientationType {
    LESBIAN = 'lesbian',
    GAY = 'gay',
    BISEXUAL = 'bisexual',
    HETEROSEXUAL = 'heterosexual',
    OTHER = 'other'
}

enum GenderIdentityType {
    MALE = 'male',
    FEMALE = 'female',
    TRANSFEMALE = 'trans-female',
    TRANSMALE = 'trans-male',
    OTHER = 'other'
}

// DTOs
export class ExamHistoryResultRequestDto implements ExamHistoryResult {
    @IsBoolean()
    public readonly done: boolean;

    @IsNumber()
    @Min(0)
    public readonly time: number;

    @IsString()
    @IsNotEmpty()
    public readonly result: string;
}

export class JobRiskRequestDto implements JobRisk {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsObject()
    public readonly physical: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly mechanic: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly chemical: Record<string, boolean> | { other: string; };
}

export class JobRiskWithPreventiveMeasureRequestDto implements JobRiskWithPreventiveMeasure {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsObject()
    public readonly biological: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly ergonomic: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly phychosocial: Record<string, boolean> | { other: string; };

    @IsString()
    @IsNotEmpty()
    public readonly preventiveMeasure: string;
}


export class InitialRecordRequestDto implements Omit<InitialRecord, 'type'> {
    /** Institution & Patient Information */
    @IsString()
    @IsNotEmpty()
    public readonly patientFirstName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientMiddleName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientLastName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientSecondLastName: string;

    @IsEnum(PatientRecordGender)
    public readonly patientGender: PatientRecordGender;

    @IsNumber()
    @Min(1)
    public readonly patientAge: number;

    @IsEnum(ReligionType)
    public readonly patientReligion: ReligionType;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly patientOtherReligion?: string | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly patientBloodType: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientLaterality: string;

    @IsEnum(SexualOrientationType)
    public readonly patientSexualOrientation: SexualOrientationType;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly patientOtherSexualOrientation?: string | undefined;

    @IsEnum(GenderIdentityType)
    public readonly patientGenderIdentity: GenderIdentityType;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly patientOtherGenderIdentity?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly patientDisabilityType?: string | undefined;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public readonly patientDisabilityPercent?: number | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly institutionHealthFacility: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRUC: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyCIU: string;

    /** Medical Consultation */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /** Job Information */
    @Type(() => Date)
    @IsDate()
    public readonly jobStartDate: Date;

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    @IsString()
    @IsNotEmpty()
    public readonly jobArea: string;

    @IsString()
    @IsNotEmpty()
    public readonly jobActivity: string;

    /** Personal information */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitTobacco?: ToxicDetailRequestDto | undefined;

    @IsOptional()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitAlcohol?: ToxicDetailRequestDto | undefined;

    @IsOptional()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitOther?: ToxicDetailRequestDto | undefined;

    @IsBoolean()
    public readonly lifestylePhysicalActivityActive: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly lifestylePhysicalActivityType?: string | undefined;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public readonly lifestylePhysicalActivityDuration?: number | undefined;

    @IsBoolean()
    public readonly lifestyleMedicationTaking: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly lifestyleMedicationName?: string | undefined;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public readonly lifestyleMedicationQuantity?: number | undefined;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public readonly lifestyleMedicationDuration?: number | undefined;

    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentDescription?: string | undefined;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    public readonly jobAccidentDate?: Date | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentObservation?: string | undefined;

    @IsBoolean()
    public readonly occupationalDiseaseHappened: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseDescription?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseDate?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseObservation?: string | undefined;

    /** Job History */
    @IsString()
    public readonly lastJobCompany: string;

    @IsString()
    public readonly lastJobPosition: string;

    @IsString()
    public readonly lastJobActivity: string;

    @IsNumber()
    @Min(0)
    public readonly lastJobTime: number;

    @IsBoolean()
    public readonly lastJobRiskPhysical: boolean;

    @IsBoolean()
    public readonly lastJobRiskMechanical: boolean;

    @IsBoolean()
    public readonly lastJobRiskChemical: boolean;

    @IsBoolean()
    public readonly lastJobRiskBiological: boolean;

    @IsBoolean()
    public readonly lastJobRiskErgonomic: boolean;

    @IsBoolean()
    public readonly lastJobRiskPsychosocial: boolean;

    @IsString()
    public readonly lastJobObservation: string;

    /** Gynecological History */
    @IsString()
    public readonly gynecologicalMenarche: string;

    @IsString()
    public readonly gynecologicalCycle: string;

    @Type(() => Date)
    @IsDate()
    public readonly gynecologicalLastMenstruationDate: Date;

    @IsString()
    public readonly gynecologicalDeeds: string;

    @IsString()
    public readonly gynecologicalBirths: string;

    @IsString()
    public readonly gynecologicalCesarean: string;

    @IsString()
    public readonly gynecologicalAbortions: string;

    @IsNumber()
    public readonly gynecologicalDeadChildren: number;

    @IsNumber()
    public readonly gynecologicalLivingChildren: number;

    @IsBoolean()
    public readonly gynecologicalSexualLife: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalFamilyPlanningType?: string | undefined;

    @IsObject()
    public readonly gynecologicalExam: Record<string, ExamHistoryResult>;

    /** Male Reproductive History */
    @IsObject()
    public readonly maleReproductiveExam: Record<string, ExamHistoryResult>;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly maleReproductiveFamilyPlanningType?: string | undefined;

    /** Review of Organs and System */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSkin?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSenseOrgans?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansBreath?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansCardiovascular?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansDigestive?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansUrinary?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSkeletalMuscle?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansEndocrinic?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansHemoLymphatic?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansHighlyStrung?: string | undefined;

    /** Vital Signs and Anthropometry */
    @IsNumber()
    @Min(0)
    public readonly vitalSignsBloodPressure: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsTemperature: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsHeartRate: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsOxygenSaturation: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsRespiratoryRate: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsWeight: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsSize: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsMassIndex: number;

    @IsNumber()
    @Min(0)
    public readonly vitalSignsAbdominalPerimeter: number;

    /** Physical Regional Exam*/
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinScar?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinTattoo?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinLesions?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeEyelids?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeConjunctiva?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyePupils?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeCorneas?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeMotility?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarAuditoryExternal?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarAuricle?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarEardrum?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxLips?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTongue?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxPharynx?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTonsils?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTeeth?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNosePartition?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseTurbinates?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseMucousMembranes?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseParanasalSinuses?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeckThyroid?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeckMobility?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestBreast?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestHeart?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestLungs?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestRibCage?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examAbdomenViscera?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examAbdomenAbdominalWall?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnFlexibility?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnDeviation?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnPain?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPelvisGenitals?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbVascular?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbUpper?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbLower?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicForce?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicSensitivity?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicGait?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicReflex?: string | undefined;

    /** Physical Regional Exam*/
    @IsEnum(MedicalFitnessType)
    public readonly medicalFitnessType: MedicalFitnessType;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Family History */
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryCardioVascular?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryMetabolic?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryNeurologic?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryOncologic?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryInfectious?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryHereditary?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryDisability?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly familyHistoryOther?: string | undefined;

    /** Job Position Risks */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobRiskRequestDto)
    public readonly jobRisks: JobRiskRequestDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobRiskWithPreventiveMeasureRequestDto)
    public readonly jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasureRequestDto[];

    /** Extra Activities & Diseases */
    @IsString()
    @IsNotEmpty()
    public readonly extraActivityDescription: string;

    @IsString()
    @IsNotEmpty()
    public readonly currentDiseaseDescription: string;

    /** General Exam */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => GeneralExamResultRequestDto)
    public readonly generalExamResults: GeneralExamResultRequestDto[];

    @IsString()
    @IsNotEmpty()
    public readonly generalExamObservation: string;

    /** Diagnostics */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /** Medical Recommendations */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
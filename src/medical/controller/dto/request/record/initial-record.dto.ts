import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { ExamHistoryResult, GenderIdentityEnum, InitialRecord, JobRisk, JobRiskWithPreventiveMeasure, ReligionRecordEnum, SexualOrientationEnum } from "@omega/medical/application/type/initial-record";
import { PatientRecordGenderEnum, GeneralExamResult, MedicalDiagnostic, MedicalFitnessTypeEnum } from "@omega/medical/application/type/record.type";
import { GeneralExamResultRequestDto, JobHistoryRequestDto, MedicalDiagnosticRequestDto, ToxicDetailRequestDto } from "./_base.dto";

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
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRUC: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyCIU: string;

    @IsString()
    @IsNotEmpty()
    public readonly institutionHealthFacility: string;

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

    @IsEnum(PatientRecordGenderEnum)
    public readonly patientGender: PatientRecordGenderEnum;

    @IsNumber()
    @IsPositive()
    public readonly patientAge: number;

    @IsEnum(ReligionRecordEnum)
    public readonly patientReligion: ReligionRecordEnum;

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

    @IsEnum(SexualOrientationEnum)
    public readonly patientSexualOrientation: SexualOrientationEnum;

    @IsEnum(GenderIdentityEnum)
    public readonly patientGenderIdentity: GenderIdentityEnum;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly patientDisabilityType?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0.01)
    public readonly patientDisabilityPercent?: number | undefined;

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

    /** Medical Consultation */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /** Personal information */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalMenarche: string;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalCycle: string;

    @Type(() => Date)
    @IsDate()
    public readonly gynecologicalLastMenstruationDate: Date;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalDeeds: string;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalBirths: string;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalCesarean: string;

    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalAbortions: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly gynecologicalDeadChildren: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly gynecologicalLivingChildren: number;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly gynecologicalSexualLife: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalFamilyPlanningType?: string | undefined;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamPapanicolau: ExamHistoryResultRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamColposcopy: ExamHistoryResultRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamBreastEcho: ExamHistoryResultRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamMammography: ExamHistoryResultRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly maleReproductiveExamProstateAntigen: ExamHistoryResult;

    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly maleReproductiveExamProstateEcho: ExamHistoryResult;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly maleReproductiveFamilyPlanningType?: string | undefined;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly maleReproductiveDeadChildren: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly maleReproductiveLivingChildren: number;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitTobacco?: ToxicDetailRequestDto | undefined;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitAlcohol?: ToxicDetailRequestDto | undefined;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitOther?: ToxicDetailRequestDto | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestylePhysicalActivityActive: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly lifestylePhysicalActivityType?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly lifestylePhysicalActivityDuration?: number | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestyleMedicationTaking: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly lifestyleMedicationName?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly lifestyleMedicationQuantity?: number | undefined;

    /** Job History */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => JobHistoryRequestDto)
    public readonly jobHistory: JobHistoryRequestDto[];

    @Type(() => Boolean)
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

    @Type(() => Boolean)
    @IsBoolean()
    public readonly occupationalDiseaseHappened: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseDescription?: string | undefined;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    public readonly occupationalDiseaseDate?: Date | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseObservation?: string | undefined;

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

    /** Job Risk */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => JobRiskRequestDto)
    public readonly jobRisks: JobRiskRequestDto[];

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => JobRiskWithPreventiveMeasureRequestDto)
    public readonly jobRiskWithPreventiveMeasure: JobRiskWithPreventiveMeasureRequestDto[];

    /** Extra Activity */
    @IsString()
    @IsNotEmpty()
    public readonly extraActivityDescription: string;

    /** Current Disease */
    @IsString()
    @IsNotEmpty()
    public readonly currentDiseaseDescription: string;

    /** Review Organs and Systems */
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
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsBloodPressure: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsTemperature: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsHeartRate: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsOxygenSaturation: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsRespiratoryRate: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsWeight: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsSize: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsMassIndex: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly vitalSignsAbdominalPerimeter: number;

    /** Physical Regional Exam */
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
    public readonly examPelvis?: string | undefined;

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

    /** General Exam and Specific */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => GeneralExamResultRequestDto)
    public readonly generalExamResults: GeneralExamResultRequestDto[];

    @IsString()
    @IsNotEmpty()
    public readonly generalExamObservation: string;

    /** Medical Fitness */
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: MedicalFitnessTypeEnum;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Diagnostic */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /** Recommendation */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
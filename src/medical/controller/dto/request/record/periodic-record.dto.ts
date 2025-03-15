import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, ToxicDetailRequestDto } from "./_base.dto";
import { JobRisk, JobRiskWithPreventiveMeasure, PeriodicRecord } from "@omega/medical/application/type/periodic-record";
import { PatientRecordGenderEnum, MedicalFitnessTypeEnum, ToxicDetail, MedicalDiagnostic } from "@omega/medical/application/type/record.type";

// DTOs
export class JobRiskRequestDto implements JobRisk {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsNumber()
    @Min(0)
    public readonly months: number;

    @IsObject()
    public readonly physical: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly mechanic: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly chemical: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly biological: Record<string, boolean> | { other: string; };

    @IsObject()
    public readonly ergonomic: Record<string, boolean> | { other: string; };

}

export class JobRiskWithPreventiveMeasureRequestDto implements JobRiskWithPreventiveMeasure {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    @Min(0)
    public readonly months: number;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsObject()
    public readonly psychosocial: Record<string, boolean> | { other: string; };

    @IsString()
    @IsNotEmpty()
    public readonly preventiveMeasure: string;
}


export class PeriodicRecordRequestDto implements Omit<PeriodicRecord, 'type'> {
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

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    /** Medical Consultation */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /** Personal information */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

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

    @IsString()
    @IsNotEmpty()
    public readonly incidentDescription: string;

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
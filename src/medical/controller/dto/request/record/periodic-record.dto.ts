import { InitialRecord, ExamHistoryResult } from "@omega/medical/application/type/initial-record";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessType, PatientRecordGender, ToxicDetailRequestDto } from "./_base.dto";
import { JobRisk, JobRiskWithPreventiveMeasure, PeriodicRecord } from "@omega/medical/application/type/periodic-record";
import { ToxicDetail, GeneralExamResult, MedicalDiagnostic } from "@omega/medical/application/type/record.type";

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
    public readonly jobPosition: string;

    /** Medical Consultation */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /** Patient History */
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
    public readonly lifestylePhysicalActivityDuration?: number | undefined;

    @IsBoolean()
    public readonly lifestyleMedicationTaking: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly lifestyleMedicationName?: string | undefined;

    @IsOptional()
    @IsNumber()
    public readonly lifestyleMedicationQuantity?: number | undefined;

    @IsOptional()
    @IsNumber()
    public readonly lifestyleMedicationDuration?: number | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly incidentDescription: string;

    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentDescription?: string | undefined;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
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

    /** Current Diseases */
    @IsString()
    @IsNotEmpty()
    public readonly currentDiseaseDescription: string;

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

    /** Medical Fitness for Job */
    @IsEnum(MedicalFitnessType)
    public readonly medicalFitnessType: MedicalFitnessType;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Medical Recommendations */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
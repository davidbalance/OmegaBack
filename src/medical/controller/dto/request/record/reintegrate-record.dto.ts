import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessTypeEnum, PatientRecordGenderEnum } from "./_base.dto";

export class ReintegrateRecordRequestDto /* implements Omit<ReintegrateRecord, 'type'>  */ {
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

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    @Type(() => Date)
    @IsDate()
    public readonly workingEndDate: Date;

    @Type(() => Date)
    @IsDate()
    public readonly workingReintegrationDate: Date;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly workingTime: number;

    @IsString()
    @IsNotEmpty()
    public readonly workingLeftCause: string;

    /** Medical Consultation */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /** Current Disease */
    @IsString()
    @IsNotEmpty()
    public readonly currentDiseaseDescription: string;

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
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examSkinScar?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examSkinTattoo?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examSkinLesions?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEyeEyelids?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEyeConjunctiva?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEyePupils?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEyeCorneas?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEyeMotility?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEarAuditoryExternal?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEarAuricle?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examEarEardrum?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPharynxLips?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPharynxTongue?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPharynxPharynx?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPharynxTonsils?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPharynxTeeth?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNosePartition?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNoseTurbinates?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNoseMucousMembranes?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNoseParanasalSinuses?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNeckThyroid?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNeckMobility?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examChestBreast?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examChestHeart?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examChestLungs?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examChestRibCage?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examAbdomenViscera?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examAbdomenAbdominalWall?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examColumnFlexibility?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examColumnDeviation?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examColumnPain?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPelvis?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examPelvisGenitals?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examLimbVascular?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examLimbUpper?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examLimbLower?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNeurologicForce?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNeurologicSensitivity?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly examNeurologicGait?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
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

    /** Diagnostic */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /** Medical Fitness */
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: MedicalFitnessTypeEnum;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Recommendation */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;

}
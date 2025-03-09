import { ExamResult, ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";
import { PatientGender } from "@prisma/client";
import { MedicalDiagnosticRequestDto, MedicalFitnessType } from "./_base.dto";
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ExamResultRequestDto implements ExamResult {
    @IsString()
    @IsNotEmpty()
    public readonly exam: string;

    @IsDate()
    public readonly date: Date;

    @IsString()
    @IsNotEmpty()
    public readonly result: string;
}

export class ReintegrateRecordRequestDto implements Omit<ReintegrateRecord, 'type'> {
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

    @IsEnum(PatientGender)
    public readonly patientGender: PatientGender;

    @IsNumber()
    @Min(0)
    public readonly patientAge: number;

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

    @IsDate()
    public readonly workingEndDate: Date;

    @IsDate()
    public readonly workingReintegrationDate: Date;

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

    /** Exam result */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExamResultRequestDto)
    public readonly examResults: ExamResultRequestDto[];

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
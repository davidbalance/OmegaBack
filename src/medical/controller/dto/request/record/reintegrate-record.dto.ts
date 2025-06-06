import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessTypeEnum, PatientRecordGenderEnum } from "./_base.dto";
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";

export class ReintegrateRecordRequestDto implements Omit<ReintegrateRecord, 'type' | 'patientDni'> {
    @ValidateIf(({ obj }) => !!obj && obj.authorDni)
    @IsString()
    @Transform(({ obj, value }) => !!obj && !!obj.authorFullname?.trim() ? value : undefined)
    public readonly authorFullname?: string;

    @ValidateIf(({ obj }) => !!obj && obj.authorFullname)
    @IsString()
    @Transform(({ obj, value }) => !!obj && !!obj.authorDni?.trim() ? value : undefined)
    public readonly authorDni?: string;

    @IsOptional()
    @IsBoolean()
    public readonly hideLogo?: boolean;

    /* ---------------------------- Institution & Patient Information ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly institutionHealthFacility: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRUC: string;

    @IsOptional()
    @IsString()
    public readonly companyCIIU?: string | undefined;

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
    public readonly patientGender: "male" | "female";

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

    @IsInt()
    @IsPositive()
    public readonly workingTime: number;

    @IsString()
    @IsNotEmpty()
    public readonly workingLeftCause: string;

    /* ---------------------------- Medical Consultation ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /* ---------------------------- Current Disease ---------------------------- */
    @IsOptional()
    @IsString()
    public readonly currentDiseaseDescription?: string | undefined;

    /* ---------------------------- Vital Signs and Anthropometry ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsBloodPressure: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsTemperature: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsHeartRate: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsOxygenSaturation: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsRespiratoryRate: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsWeight: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsSize: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsMassIndex: string;

    @IsString()
    @IsNotEmpty()
    public readonly vitalSignsAbdominalPerimeter: string;

    /* ---------------------------- Physical Regional Exam ---------------------------- */
    @IsOptional()
    @IsString()
    public readonly examSkinScar?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examSkinTattoo?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examSkinLesions?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEyeEyelids?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEyeConjunctiva?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEyePupils?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEyeCorneas?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEyeMotility?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEarAuditoryExternal?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEarAuricle?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examEarEardrum?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPharynxLips?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPharynxTongue?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPharynxPharynx?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPharynxTonsils?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPharynxTeeth?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNosePartition?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNoseTurbinates?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNoseMucousMembranes?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNoseParanasalSinuses?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeckThyroid?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeckMobility?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examChestBreast?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examChestHeart?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examChestLungs?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examChestRibCage?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examAbdomenViscera?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examAbdomenAbdominalWall?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examColumnFlexibility?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examColumnDeviation?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examColumnPain?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPelvis?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examPelvisGenitals?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examLimbVascular?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examLimbUpper?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examLimbLower?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeurologicForce?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeurologicSensitivity?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeurologicGait?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly examNeurologicReflex?: string | undefined;

    /* ---------------------------- General Exam Result and Specific ---------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => GeneralExamResultRequestDto)
    public readonly generalExamResults: GeneralExamResultRequestDto[];

    @IsOptional()
    @IsString()
    public readonly generalExamObservation?: string | undefined;

    /* ---------------------------- Medical Fitness for Job ---------------------------- */
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: "fit" | "fit-observation" | "fit-limitation" | "no-fit";

    @IsOptional()
    @IsString()
    public readonly medicalFitnessObservation?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly medicalFitnessLimitation?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly medicalFitnessReubication?: string | undefined;

    /* ---------------------------- Diagnostics ---------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /* ---------------------------- Recommendation ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
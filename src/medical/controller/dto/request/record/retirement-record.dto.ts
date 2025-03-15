import { PatientRecordGenderEnum, GeneralExamResult, MedicalDiagnostic } from "@omega/medical/application/type/record.type";
import { RetirementInstitutionActivity, RetirementRecord } from "@omega/medical/application/type/retirement-record";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto } from "./_base.dto";

class RetirementInstitutionActivityRequestDto implements RetirementInstitutionActivity {
    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsString()
    @IsNotEmpty()
    public readonly risk: string;
}

export class RetirementRecordRequestDto implements Omit<RetirementRecord, 'type'> {
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

    @Type(() => Date)
    @IsDate()
    public readonly workStartDate: Date;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly workingTime: number;

    @Type(() => Date)
    @IsDate()
    public readonly workingEndDate: Date;

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => RetirementInstitutionActivityRequestDto)
    public readonly institutionActivities: RetirementInstitutionActivityRequestDto[];

    /** Personal information */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

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

    /** Diagnostic */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /** Retirement Evaluation */

    @Type(() => Boolean)
    @IsBoolean()
    public readonly retirementDone: boolean;

    @IsString()
    @IsNotEmpty()
    public readonly retirementObservation: string;

    /** Recommendation */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;

}
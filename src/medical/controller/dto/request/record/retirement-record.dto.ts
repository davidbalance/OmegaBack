import { RetirementInstitutionActivity, RetirementRecord } from "@omega/medical/application/type/retirement-record";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsPositive, IsString, ValidateIf, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, PatientRecordGenderEnum } from "./_base.dto";

class RetirementInstitutionActivityRequestDto implements RetirementInstitutionActivity {
    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsString()
    @IsNotEmpty()
    public readonly risk: string;
}

export class RetirementRecordRequestDto implements Omit<RetirementRecord, 'type' | 'patientDni'> {
    /* --------------------------------------------------- Institution & Patient Information --------------------------------------------------- */
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

    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => RetirementInstitutionActivityRequestDto)
    public readonly institutionActivities: RetirementInstitutionActivityRequestDto[];

    @Type(() => Date)
    @IsDate()
    public readonly workStartDate: Date;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    public readonly workingTime: number;

    @Type(() => Date)
    @IsDate()
    public readonly workingEndDate: Date;

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    /* --------------------------------------------------- Patient history --------------------------------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentDescription?: string | undefined;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @Type(() => Date)
    @IsDate()
    public readonly jobAccidentDate?: Date | undefined;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentObservation?: string | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly occupationalDiseaseHappened: boolean;
    
    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsString()
    public readonly occupationalDiseaseDescription?: string | undefined;
    
    @ValidateIf((obj) => obj.jobAccidentHappened)
    @Type(() => Date)
    @IsDate()
    public readonly occupationalDiseaseDate?: Date | undefined;
    
    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseObservation?: string | undefined;

    /* --------------------------------------------------- Vital Signs and Anthropometry --------------------------------------------------- */
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

    /* --------------------------------------------------- Physical Regional Exam --------------------------------------------------- */
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

    /* --------------------------------------------------- General Exam Result and Specific --------------------------------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => GeneralExamResultRequestDto)
    public readonly generalExamResults: GeneralExamResultRequestDto[];

    @IsOptional()
    @IsString()
    public readonly generalExamObservation?: string | undefined;

    /* --------------------------------------------------- Diagnostics --------------------------------------------------- */
    @Type(() => Boolean)
    @IsBoolean()
    public readonly retirementEvaluationDone: boolean;

    @IsOptional()
    @IsString()
    public readonly retirementEvaluationObservation?: string | undefined;

    /* --------------------------------------------------- Diagnostics --------------------------------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => MedicalDiagnosticRequestDto)
    public readonly diagnostics: MedicalDiagnosticRequestDto[];

    /* --------------------------------------------------- Recommendation --------------------------------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
import { JobHistory } from '@omega/medical/application/type/initial-record';
import { GeneralExamResult, JobAccident, LifeStyle, MedicalDiagnostic, MedicalFitnessForJob, MedicalFitnessTypeEnum, OccupationalDisease, PhysicalRegionalExam, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from '@omega/medical/application/type/record.type';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

// DTOs
export class ToxicDetailRequestDto implements ToxicDetail {
    @Type(() => Boolean)
    @IsBoolean()
    public readonly consumed: boolean;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly consumptionTime: number;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    public readonly quantity: number;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly consumer: boolean;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly timeOfAbstinence: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly other?: string | undefined;

}

export class LifeStyleRequestDto implements LifeStyle {

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
}

export class JobHistoryRequestDto implements JobHistory {
    @IsString()
    @IsNotEmpty()
    public readonly lastJobCompany: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastJobPosition: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastJobActivity: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly lastJobTime: number;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskPhysical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskMechanical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskChemical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskBiological: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskErgonomic: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lastJobRiskPsychosocial: boolean;

    @IsString()
    @IsNotEmpty()
    public readonly lastJobObservation: string;
}

export class JabAccidentRequestDto implements JobAccident {
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
}

export class OccupationalDiseaseRequestDto implements OccupationalDisease {
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

}

export class ReviewOfOrgansAndSystemRequestDto implements ReviewOfOrgansAndSystem {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSkin?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSenseOrgans?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansBreath?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansCardiovascular?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansDigestive?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansUrinary?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansSkeletalMuscle?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansEndocrinic?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansHemoLymphatic?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly reviewOfOrgansHighlyStrung?: string;
}

export class VitalSignsAndAnthropometryRequestDto implements VitalSignsAndAnthropometry {
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
}

export class PhysicalRegionalExamRequestDto implements PhysicalRegionalExam {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinScar?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinTattoo?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSkinLesions?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeEyelids?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeConjunctiva?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyePupils?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeCorneas?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEyeMotility?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarAuditoryExternal?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarAuricle?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examEarEardrum?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxLips?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTongue?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxPharynx?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTonsils?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPharynxTeeth?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNosePartition?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseTurbinates?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseMucousMembranes?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNoseParanasalSinuses?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeckThyroid?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeckMobility?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestBreast?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestHeart?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestLungs?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examChestRibCage?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examAbdomenViscera?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examAbdomenAbdominalWall?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnFlexibility?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnDeviation?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examColumnPain?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examPelvisGenitals?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbVascular?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbUpper?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examLimbLower?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicForce?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicSensitivity?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicGait?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examNeurologicReflex?: string;
}

export class GeneralExamResultRequestDto implements GeneralExamResult {
    @IsString()
    @IsNotEmpty()
    public readonly exam: string;

    @Type(() => Date)
    @IsDate()
    public readonly date: Date;

    @IsString()
    @IsNotEmpty()
    public readonly result: string;
}

export class MedicalDiagnosticRequestDto implements MedicalDiagnostic {
    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    @IsString()
    @IsNotEmpty()
    public readonly cie: string;

    @IsString()
    @IsNotEmpty()
    public readonly pre: boolean;

    @IsString()
    @IsNotEmpty()
    public readonly def: boolean;
}

export class MedicalFitnessForJobRequestDto implements MedicalFitnessForJob {
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: MedicalFitnessTypeEnum;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

}
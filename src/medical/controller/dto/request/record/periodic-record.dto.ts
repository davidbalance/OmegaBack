import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessTypeEnum, PatientRecordGenderEnum, ToxicDetailRequestDto } from "./_base.dto";
import { JobRisk, JobRiskWithPreventiveMeasure, PeriodicRecord } from "@omega/medical/application/type/periodic-record";

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

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskHighTemperature?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskLowTemperature?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskIonicRadiation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskNonIonicRadiation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskNoise?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskVibration?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskIllumination?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskVentilation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly physicalRiskElectricFluid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskEntrapmentBetweenMachines?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskTrappingBetweenSurfaces?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskEntrapmentBetweenObjects?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskObjectFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskSameLevelFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskDifferentLevelFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskElectricContact?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskSurfacesContact?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskParticlesProjection?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskFluidProjection?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskJab?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskCut?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskHitByVehicles?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly mechanicRiskVehicleCollision?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskSolid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskDust?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskSmoke?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskLiquid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskSteam?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskAerosol?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskMist?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly chemicalRiskGas?: boolean | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly physicalRiskOther?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly mechanicRiskOther?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly chemicalRiskOther?: string | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskVirus?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskFungus?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskBacteria?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskParasites?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskExposureToVectors?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly biologicalRiskExposureToWildlifeAnimals?: boolean | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly biologicalRiskOther?: string | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly ergonomicRiskManualHandlingLoads?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly ergonomicRiskRepetitiveMoves?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly ergonomicRiskForcedPostures?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly ergonomicRiskWorkWithPvd?: boolean | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly ergonomicRiskOther?: string | undefined;
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

    @IsString()
    @IsNotEmpty()
    public readonly preventiveMeasure: string;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskMonotony?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskWorkOverload?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskThoroughnessOfTheTask?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskHighResponsibility?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskTakingResponsibilityAutonomy?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskSupervision?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskRoleConflict?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskNonFunctionClarify?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskBadWorkDistribution?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskRotativeShift?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskIntrapersonalRelations?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value ? value : undefined)
    public readonly psychosocialRiskJobInstability?: boolean | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly psychosocialRiskOther?: string | undefined;
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
    @Transform(({ value, obj }) => obj.lifestylePhysicalActivityActive ? value : undefined)
    public readonly lifestylePhysicalActivityType?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ value, obj }) => obj.lifestylePhysicalActivityActive ? value : undefined)
    public readonly lifestylePhysicalActivityDuration?: number | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestyleMedicationTaking: boolean;

    @IsOptional()
    @IsString()
    @Transform(({ value, obj }) => obj.lifestyleMedicationTaking ? value : undefined)
    public readonly lifestyleMedicationName?: string | undefined;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ value, obj }) => obj.lifestyleMedicationTaking ? value : undefined)
    public readonly lifestyleMedicationQuantity?: number | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly incidentDescription: string;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => obj.jobAccidentHappened ? value : undefined)
    public readonly jobAccidentDescription?: string | undefined;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Transform(({ value, obj }) => obj.jobAccidentHappened ? value : undefined)
    public readonly jobAccidentDate?: Date | undefined;

    @ValidateIf((obj) => obj.jobAccidentHappened)
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => obj.jobAccidentHappened ? value : undefined)
    public readonly jobAccidentObservation?: string | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly occupationalDiseaseHappened: boolean;

    @ValidateIf((obj) => obj.occupationalDiseaseHappened)
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => obj.occupationalDiseaseHappened ? value : undefined)
    public readonly occupationalDiseaseDescription?: string | undefined;

    @ValidateIf((obj) => obj.occupationalDiseaseHappened)
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @Transform(({ value, obj }) => obj.occupationalDiseaseHappened ? value : undefined)
    public readonly occupationalDiseaseDate?: Date | undefined;

    @ValidateIf((obj) => obj.occupationalDiseaseHappened)
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => obj.occupationalDiseaseHappened ? value : undefined)
    public readonly occupationalDiseaseObservation?: string | undefined;

    /** Family History */
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryCardioVascular?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryMetabolic?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryNeurologic?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryOncologic?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryInfectious?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryHereditary?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly familyHistoryDisability?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
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
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansSkin?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansSenseOrgans?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansBreath?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansCardiovascular?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansDigestive?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansUrinary?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansSkeletalMuscle?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansEndocrinic?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly reviewOfOrgansHemoLymphatic?: string | undefined;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
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
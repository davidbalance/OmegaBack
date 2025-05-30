import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { GeneralExamResultRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessTypeEnum, ToxicDetailRequestDto } from "./_base.dto";
import { JobRisk, PeriodicRecord } from "@omega/medical/application/type/periodic-record";
import { GeneralExamResult, MedicalDiagnostic, ToxicDetail } from "@omega/medical/application/type/record.type";
import { GenderIdentityEnum } from "./initial-record.dto";

// DTOs
export class JobRiskRequestDto implements JobRisk {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

    @IsInt()
    @Min(1)
    public readonly months: number;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskHighTemperature?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskLowTemperature?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskIonicRadiation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskNonIonicRadiation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskNoise?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskVibration?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskIllumination?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskVentilation?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskElectricFluid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskEntrapmentBetweenMachines?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskTrappingBetweenSurfaces?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskEntrapmentBetweenObjects?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskObjectFalling?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskSameLevelFalling?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskDifferentLevelFalling?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskElectricContact?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskSurfacesContact?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskParticlesProjection?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskFluidProjection?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskJab?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskCut?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskHitByVehicles?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskVehicleCollision?: Boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskSolid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskDust?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskSmoke?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskLiquid?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskSteam?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskAerosol?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskMist?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskGas?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskVirus?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskFungus?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskBacteria?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskParasites?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskExposureToVectors?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskExposureToWildlifeAnimals?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly ergonomicRiskManualHandlingLoads?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly ergonomicRiskRepetitiveMoves?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly ergonomicRiskForcedPostures?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly ergonomicRiskWorkWithPvd?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskMonotony?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskWorkOverload?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskThoroughnessOfTheTask?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskHighResponsibility?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskTakingResponsibilityAutonomy?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskSupervision?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskRoleConflict?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskNonFunctionClarify?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskBadWorkDistribution?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskRotativeShift?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskIntrapersonalRelations?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskJobInstability?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly physicalRiskOther?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskOther?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly chemicalRiskOther?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly biologicalRiskOther?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly ergonomicRiskOther?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly psychosocialRiskOther?: boolean | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly preventiveMeasure: string;
}


export class PeriodicRecordRequestDto implements Omit<PeriodicRecord, 'type' | 'patientDni' | 'authorFullname' | 'authorDni'> {
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

    @IsEnum(GenderIdentityEnum)
    public readonly patientGender: "male" | "female";

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    /* ---------------------------- Medical Consultation ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /* ---------------------------- Patient History ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitTobacco: ToxicDetail;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitAlcohol: ToxicDetail;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitOther: ToxicDetail;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestylePhysicalActivity: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.lifestylePhysicalActivity)
    @IsString()
    @IsNotEmpty()
    public readonly lifestylePhysicalActivityType?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.lifestylePhysicalActivity)
    @IsString()
    @IsNotEmpty()
    public readonly lifestylePhysicalActivityTimeQty?: string | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestyleMedication: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.lifestyleMedication)
    @IsString()
    @IsNotEmpty()
    public readonly lifestyleMedicationName?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.lifestyleMedication)
    @IsString()
    @IsNotEmpty()
    public readonly lifestyleMedicationTimeQty?: string | undefined;

    @IsString()
    @IsNotEmpty()
    public readonly incidentDescription: string;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentDescription?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.jobAccidentHappened)
    @Type(() => Date)
    @IsDate()
    public readonly jobAccidentDate?: Date | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    public readonly jobAccidentObservation?: string | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly occupationalDiseaseHappened: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.occupationalDiseaseHappened)
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseDescription?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.occupationalDiseaseHappened)
    @Type(() => Date)
    @IsDate()
    public readonly occupationalDiseaseDate?: Date | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.occupationalDiseaseHappened)
    @IsString()
    @IsNotEmpty()
    public readonly occupationalDiseaseObservation?: string | undefined;

    /* ---------------------------- Job Risks ---------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => JobRiskRequestDto)
    public readonly jobRisks: JobRiskRequestDto[];

    /* ---------------------------- Family History ---------------------------- */
    @IsOptional()
    @IsString()
    public readonly familyHistoryCardioVascular?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryMetabolic?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryNeurologic?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryOncologic?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryInfectious?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryHereditary?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryDisability?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly familyHistoryOther?: string | undefined;

    /* ---------------------------- Current Disease ---------------------------- */
    @IsOptional()
    @IsString()
    public readonly currentDiseaseDescription?: string | undefined;

    /* ---------------------------- Review of Organs and System ---------------------------- */
    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansSkin?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansSenseOrgans?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansBreath?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansCardiovascular?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansDigestive?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansUrinary?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansSkeletalMuscle?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansEndocrinic?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansHemoLymphatic?: string | undefined;

    @IsOptional()
    @IsString()
    public readonly reviewOfOrgansHighlyStrung?: string | undefined;

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

    @ValidateIf(({ obj }) => !!obj && obj.medicalFitnessType === 'fit-observation')
    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.medicalFitnessType === 'fit-observation')
    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation?: string | undefined;

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
import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, Min, ValidateIf, ValidateNested } from "class-validator";
import { ExamHistoryResult, InitialRecord, JobRisk } from "@omega/medical/application/type/initial-record";
import { GeneralExamResultRequestDto, JobHistoryRequestDto, MedicalDiagnosticRequestDto, MedicalFitnessTypeEnum, PatientRecordGenderEnum, ToxicDetailRequestDto } from "./_base.dto";

// Enums
export enum ReligionRecordEnum {
    CATHOLIC = "catholic",
    EVANGELICAL = "evangelical",
    JEHOVAHS_WITNESSES = "jehovah's witnesses",
    MORMON = "mormon",
    OTHER = "other",
}

export enum SexualOrientationEnum {
    LESBIAN = 'lesbian',
    GAY = 'gay',
    BISEXUAL = 'bisexual',
    HETEROSEXUAL = 'heterosexual',
    UNKNOWN = 'unknown',
}

export enum GenderIdentityEnum {
    MALE = 'male',
    FEMALEfemale = 'female',
    TRANS_FEMALE = 'trans-female',
    TRANS_MALE = 'trans-male',
    UNKNOWN = 'unknown',
}

export enum PatientLateralityEnum {
    RIGHT = 'right',
    LEFT = 'left'
}


// DTOs
export class ExamHistoryResultRequestDto implements ExamHistoryResult {
    @Type(() => Boolean)
    @IsBoolean()
    public readonly done: boolean;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ value, obj }) => obj.done ? value : undefined)
    public readonly time?: number;

    @IsOptional()
    @IsString()
    @Transform(({ value, obj }) => obj.done ? value : undefined)
    public readonly result?: string;
}

export class JobRiskRequestDto implements JobRisk {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly activity: string;

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
    public readonly mechanicRiskEntrapmentBetweenMachines?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskTrappingBetweenSurfaces?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskEntrapmentBetweenObjects?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskObjectFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskSameLevelFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskDifferentLevelFalling?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskElectricContact?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskSurfacesContact?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskParticlesProjection?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskFluidProjection?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskJab?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskCut?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskHitByVehicles?: boolean | undefined;

    @IsOptional()
    @IsBoolean()
    public readonly mechanicRiskVehicleCollision?: boolean | undefined;

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


export class InitialRecordRequestDto implements Omit<InitialRecord, 'type' | 'patientDni'> {
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
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRUC: string;

    @IsOptional()
    @IsString()
    public readonly companyCIIU?: string | undefined;

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
    public readonly patientGender: "male" | "female";

    @IsNumber()
    @IsPositive()
    public readonly patientAge: number;

    @IsEnum(ReligionRecordEnum)
    public readonly patientReligion: "catholic" | "evangelical" | "jehovah's witnesses" | "mormon" | "other";

    @IsString()
    @IsNotEmpty()
    public readonly patientBloodType: string;

    @IsEnum(PatientLateralityEnum)
    public readonly patientLaterality: 'right' | 'left';

    @IsEnum(SexualOrientationEnum)
    public readonly patientSexualOrientation: "lesbian" | "gay" | "bisexual" | "heterosexual" | "unknown";

    @IsEnum(GenderIdentityEnum)
    public readonly patientGenderIdentity: "unknown" | "male" | "female" | "trans-female" | "trans-male";

    @IsOptional()
    @IsString()
    public readonly patientDisabilityType?: string | undefined;

    @ValidateIf(({ obj }) => obj && !!obj.patientDisabilityType)
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Transform(({ obj, value }) => !obj && !!obj.patientDisabilityType ? value : undefined)
    public readonly patientDisabilityPercent?: number | undefined;

    @Type(() => Date)
    @IsDate()
    public readonly institutionJobStartDate: Date;

    @IsString()
    @IsNotEmpty()
    public readonly institutionJobPosition: string;

    @IsString()
    @IsNotEmpty()
    public readonly institutionJobArea: string;

    @IsString()
    @IsNotEmpty()
    public readonly institutionJobActivities: string;

    /* ---------------------------- Medical Consultation ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalConsultationDescription: string;

    /* ---------------------------- Patient History ---------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly medicalAndSurgicalHistory: string;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => !!obj && obj.patientGender === 'female' ? value : '')
    public readonly gynecologicalMenarche: string;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsString()
    @IsNotEmpty()
    @Transform(({ value, obj }) => !!obj && obj.patientGender === 'female' ? value : '')
    public readonly gynecologicalCycle: string;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @Type(() => Date)
    @IsDate()
    public readonly gynecologicalLastMenstruationDate: Date;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalDeeds: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalBirths: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalCesarean: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalAbortions: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalDeadChildren: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsNumber()
    @Min(0)
    public readonly gynecologicalLivingChildren: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @Type(() => Boolean)
    @IsBoolean()
    public readonly gynecologicalSexualLife: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly gynecologicalFamilyPlanningType?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamPapanicolau: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamColposcopy: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamBreastEcho: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'female')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly gynecologicalExamMammography: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'male')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly maleReproductiveExamProstateAntigen: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'male')
    @IsObject()
    @ValidateNested()
    @Type(() => ExamHistoryResultRequestDto)
    public readonly maleReproductiveExamProstateEcho: ExamHistoryResultRequestDto;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'male')
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly maleReproductiveFamilyPlanningType?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'male')
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly maleReproductiveDeadChildren: number;

    @ValidateIf(({ obj }) => !!obj && obj.patientGender === 'male')
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly maleReproductiveLivingChildren: number;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitTobacco: ToxicDetailRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitAlcohol: ToxicDetailRequestDto;

    @IsObject()
    @ValidateNested()
    @Type(() => ToxicDetailRequestDto)
    public readonly toxicHabitOther: ToxicDetailRequestDto;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestylePhysicalActivity: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.lifestylePhysicalActivity)
    @IsString()
    @IsNotEmpty()
    @Transform(({ obj, value }) => !!obj && obj.lifestylePhysicalActivity ? value : undefined)
    public readonly lifestylePhysicalActivityType?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.lifestylePhysicalActivity)
    @IsString()
    @IsNotEmpty()
    @Transform(({ obj, value }) => !!obj && obj.lifestylePhysicalActivity ? value : undefined)
    public readonly lifestylePhysicalActivityTimeQty?: string | undefined;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly lifestyleMedication: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.lifestyleMedication)
    @IsString()
    @IsNotEmpty()
    @Transform(({ obj, value }) => !!obj && obj.lifestyleMedication ? value : undefined)
    public readonly lifestyleMedicationName?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.lifestyleMedication)
    @IsString()
    @IsNotEmpty()
    @Transform(({ obj, value }) => !!obj && obj.lifestyleMedication ? value : undefined)
    public readonly lifestyleMedicationTimeQty?: string | undefined;

    /* ---------------------------- Job History ---------------------------- */
    @IsArray()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => JobHistoryRequestDto)
    public readonly jobHistory: JobHistoryRequestDto[];

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobAccidentHappened: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.jobAccidentHappened)
    @IsString()
    @IsNotEmpty()
    @Transform(({ obj, value }) => !!obj && obj.jobAccidentHappened ? value : undefined)
    public readonly jobAccidentDescription?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.jobAccidentHappened)
    @Type(() => Date)
    @IsDate()
    @Transform(({ obj, value }) => !!obj && obj.jobAccidentHappened ? value : undefined)
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
    @Transform(({ obj, value }) => !!obj && obj.occupationalDiseaseHappened ? value : undefined)
    public readonly occupationalDiseaseDescription?: string | undefined;

    @ValidateIf(({ obj }) => !!obj && obj.occupationalDiseaseHappened)
    @Type(() => Date)
    @IsDate()
    @Transform(({ obj, value }) => !!obj && obj.occupationalDiseaseHappened ? value : undefined)
    public readonly occupationalDiseaseDate?: Date | undefined;

    @IsOptional()
    @IsString()
    public readonly occupationalDiseaseObservation?: string | undefined;

    /* ---------------------------- Job Risk ---------------------------- */
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

    /* ---------------------------- Job Extra Activities ---------------------------- */
    @IsString()
    public readonly extraActivityDescription?: string | undefined;

    /* ---------------------------- Current disease ---------------------------- */
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

    @ValidateIf(({ obj }) => !!obj && obj.medicalFitnessType === 'fit-limitation')
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
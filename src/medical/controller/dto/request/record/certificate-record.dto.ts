import { CertificateRecord } from "@omega/medical/application/type/certificate-record";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { MedicalFitnessTypeEnum, PatientRecordGenderEnum } from "./_base.dto";

// Enums
enum GeneralDataEnum {
    ENTRY = 'entry',
    PERIODIC = 'periodic',
    REINTEGRATE = 'reintegrate',
    RETIREMENT = 'retirement',
}

enum EvaluationConditionEnum {
    PRESUNTIVE = 'presuntive',
    DEFINITIVE = 'definitive',
    NO_APPLY = 'no-apply'
}

enum EvaluationConditionWithJobEnum {
    YES = 'yes',
    NO = 'no',
    NO_APPLY = 'no-apply'
}


export class CertficateRecordRequestDto implements Omit<CertificateRecord, 'type' | 'patientDni' | 'authorFullname' | 'authorDni'> {
    @IsOptional()
    @IsBoolean()
    public readonly hideLogo?: boolean;

    /* -------------------------------- Institution & Patient Information -------------------------------- */
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

    @IsString()
    @IsNotEmpty()
    public readonly jobPosition: string;

    /* -------------------------------- General Data -------------------------------- */
    @IsEnum(GeneralDataEnum)
    public readonly generalData: "entry" | "periodic" | "reintegrate" | "retirement";

    /* -------------------------------- Medical Fitness for Job -------------------------------- */
    @ValidateIf(({ obj }) => !!obj && obj.generalData !== 'retirement')
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: "fit" | "fit-observation" | "fit-limitation" | "no-fit";

    @ValidateIf(({ obj }) => !!obj && obj.generalData !== 'retirement')
    public readonly medicalFitnessObservation?: string | undefined;

    /* -------------------------------- Retirement Evaluation -------------------------------- */
    @ValidateIf(({ obj }) => !!obj && obj.generalData === 'retirement')
    @Type(() => Boolean)
    @IsBoolean()
    public readonly retirementEvaluationDone: boolean;

    @ValidateIf(({ obj }) => !!obj && obj.generalData === 'retirement')
    @IsEnum(EvaluationConditionEnum)
    public readonly retirementEvaluationCondition: "presuntive" | "definitive" | "no-apply";

    @ValidateIf(({ obj }) => !!obj && obj.generalData === 'retirement')
    @IsEnum(EvaluationConditionWithJobEnum)
    public readonly retirementEvaluationConditionWithJob: "no-apply" | "yes" | "no";
    /* -------------------------------- Recommendation -------------------------------- */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
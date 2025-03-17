import { CertificateRecord } from "@omega/medical/application/type/certificate-record";
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsString } from "class-validator";
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


// DTOs
export class CertficateRecordRequestDto implements Omit<CertificateRecord, 'type'> {
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

    /** General date */
    @IsEnum(GeneralDataEnum)
    public readonly generalData: GeneralDataEnum;

    /** Medical Fitness */
    @IsEnum(MedicalFitnessTypeEnum)
    public readonly medicalFitnessType: MedicalFitnessTypeEnum;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Retirement Medical Evaluation */
    @Type(() => Boolean)
    @IsBoolean()
    public readonly retirementEvaluationDone: boolean;

    @IsEnum(EvaluationConditionEnum)
    public readonly retirementEvaluationCondition: EvaluationConditionEnum;

    @IsEnum(EvaluationConditionWithJobEnum)
    public readonly retirementEvaluationConditionWithJob: EvaluationConditionWithJobEnum;

    /** Recommendation */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;

}
import { CertficateRecord } from "@omega/medical/application/type/certificate-record";
import { MedicalFitnessType, PatientRecordGender } from "./_base.dto";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

//  Enums
enum GeneralEvaluationType {
    ENTRY = "entry",
    PERIODIC = "periodic",
    REINTEGRATE = "reintegrate",
    RETIREMENT = "retirement",
}

enum DiagnosticCondition {
    PRESUMPTIVE = "presumptive",
    DEFINITIVE = "definitive",
    NO_APPLY = "no-apply"
}

enum RetirementHealth {
    YES = "yes",
    NO = "no",
    NO_APPLY = "no-apply"
}

// DTOs
export class CertficateRecordRequestDto implements Omit<CertficateRecord, 'type'> {
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

    @IsEnum(PatientRecordGender)
    public readonly patientGender: PatientRecordGender;

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

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly jobPosition?: string | undefined;

    /** General data */
    @IsEnum(GeneralEvaluationType)
    public readonly generalDataEvaluation: GeneralEvaluationType;

    /** Physical Regional Exam*/
    @IsEnum(MedicalFitnessType)
    public readonly medicalFitnessType: MedicalFitnessType;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessObservation: string;

    @IsString()
    @IsNotEmpty()
    public readonly medicalFitnessLimitation: string;

    /** Medical Retirement Evaluation */
    @IsBoolean()
    public readonly retirementEvaluationDone: boolean;

    @IsEnum(DiagnosticCondition)
    public readonly retirementDiagnosticCondition: DiagnosticCondition;

    @IsEnum(RetirementHealth)
    public readonly retirementHealth: RetirementHealth;

    /** Medical Recommendations */
    @IsString()
    @IsNotEmpty()
    public readonly recommendationDescription: string;
}
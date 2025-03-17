import { JobHistory } from '@omega/medical/application/type/initial-record';
import { GeneralExamResult, MedicalDiagnostic, ToxicDetail } from '@omega/medical/application/type/record.type';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

// Enums
export enum PatientRecordGenderEnum {
    MALE = 'male',
    FEMALE = 'female',
}

export enum MedicalFitnessTypeEnum {
    FIT = 'fit',
    FIT_OBSERVATION = 'fit-observation',
    FIT_LIMITATION = 'fit-limitation',
    NO_FIT = 'no-fit',
}

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
    @IsPositive()
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
    @Transform(({ value }) => value.trim() !== '' ? value : undefined)
    public readonly other?: string | undefined;

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

    @Type(() => Boolean)
    @IsBoolean()
    public readonly pre: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly def: boolean;
}
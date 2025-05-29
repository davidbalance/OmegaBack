import { JobHistory } from '@omega/medical/application/type/initial-record';
import { GeneralExamResult, MedicalDiagnostic, ToxicDetail } from '@omega/medical/application/type/record.type';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, ValidateIf } from 'class-validator';

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
    public readonly haveConsume: boolean;

    @ValidateIf((obj) => obj.haveConsume)
    @IsString()
    @IsNotEmpty()
    public readonly name: string | undefined;

    @ValidateIf((obj) => obj.haveConsume)
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ obj, value }) => !!obj && obj.haveConsume ? value : undefined)
    public readonly consumptionTime: number | undefined;

    @ValidateIf((obj) => obj.haveConsume)
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Transform(({ obj, value }) => !!obj && obj.haveConsume ? value : undefined)
    public readonly quantity: number | undefined;

    @ValidateIf((obj) => obj.haveConsume)
    @Type(() => Boolean)
    @IsBoolean()
    @Transform(({ obj, value }) => !!obj && obj.haveConsume ? value : undefined)
    public readonly isExConsumer: boolean | undefined;

    @ValidateIf((obj) => obj.haveConsume && obj.isExConsumer)
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ obj, value }) => !!obj && obj.haveConsume && obj.isExConsumer ? value : undefined)
    public readonly timeOfAbstinence: number | undefined;
}

export class JobHistoryRequestDto implements JobHistory {
    @IsString()
    @IsNotEmpty()
    public readonly jobHistoryCompany: string;

    @IsString()
    @IsNotEmpty()
    public readonly jobHistoryPosition: string;

    @IsString()
    @IsNotEmpty()
    public readonly jobHistoryActivity: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly jobHistoryTime: number;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskPhysical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskMechanical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskChemical: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskBiological: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskErgonomic: boolean;

    @Type(() => Boolean)
    @IsBoolean()
    public readonly jobHistoryRiskPsychosocial: boolean;

    @IsOptional()
    @IsString()
    public readonly jobHistoryObservation?: string;
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

    @IsEnum({ pre: 'pre', def: 'def' })
    public readonly flag: 'pre' | 'def';
}
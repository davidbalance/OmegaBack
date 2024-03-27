import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { CreateDoctorRequestDTO } from "./doctor.request.dto";
import { Type } from "class-transformer";
import { CreateOrderRequestDTO } from "./order.request.dto";
import { CreateExamRequestDTO } from "./exam.request.dto";

export class CreateResultRequestDTO {
    @IsNumber()
    public readonly order: number;

    @IsNumber()
    public readonly createOrder: CreateOrderRequestDTO;

    @IsNumber()
    public readonly exam: number;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateExamRequestDTO)
    public readonly createExam: CreateExamRequestDTO;

    @IsNumber()
    public readonly doctor: number;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateDoctorRequestDTO)
    public readonly createDoctor: CreateDoctorRequestDTO;

    @IsNumber()
    public readonly labint: number;
}

export class UpdateResultRequestDTO { }

export class FindOneResultAndInsertMorbidityRequestDTO {
    public readonly morbidity: number;
}

export class FindOneOrInsertResultRequestDTO { }
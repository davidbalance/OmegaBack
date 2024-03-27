import { Result } from "@/medical-order/result/entities/result.entity";

export class CreateResultResponseDTO { }

export class FindResultResponseDTO {
    public readonly results: Result[]
}

export class FindOneResultAndInsertMorbidityResponseDTO {
    public readonly morbidity: number;
}
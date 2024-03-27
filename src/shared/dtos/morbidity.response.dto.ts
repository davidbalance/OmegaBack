import { Morbidity } from "@/morbidity/morbidity/entities/morbidity.entity";

export class CreateMorbidityResponseDTO { }

export class FindMorbidityResponseDTO {
    public readonly morbidities: Morbidity[];
}

export class FindOneMorbidityResponseDTO {
    public readonly morbidity: Morbidity;
}

export class UpdateMobidityResponseDTO { }

export class FindOneAndInactiveResponseDTO { }
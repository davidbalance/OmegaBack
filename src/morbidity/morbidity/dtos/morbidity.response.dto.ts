import { SelectorOption } from "@/shared";

export class FindMorbidity {
    public readonly id: number;
    public readonly name: string;
}

export class FindMorbiditySelectorOptionsResponseDTO {
    public readonly options: SelectorOption<number>[];
}

export class CreateMorbidityResponseDTO { }

export class FindMorbiditiesResponseDTO {
    public readonly morbidities: FindMorbidity[]
}

export class FindOneMorbidityAndUpdateResponseDTO { }

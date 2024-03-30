import { SelectorOption } from "@/shared";

export class FindDisease {
    public readonly id: number;
    public readonly name: string;
}

export class FindDiseaseSelectorOptionsResponseDTO {
    public readonly options: SelectorOption<number>[];
}

export class CreateDiseaseResponseDTO { }

export class FindMorbiditiesResponseDTO {
    public readonly diseases: FindDisease[]
}

export class FindOneDiseaseAndUpdateResponseDTO { }

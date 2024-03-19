export class CreateCorporativeGroupRequestDTO {
    public readonly name: string;
}

export class FindOneOrCreateCorporativeGroupRequestDTO extends CreateCorporativeGroupRequestDTO {
    public readonly lookup: number;
}

export class UpdateCorporativeGroupRequestDTO {
    public readonly name: string;
}
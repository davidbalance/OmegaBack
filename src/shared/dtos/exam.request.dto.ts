export class CreateExamRequestDTO {
    public readonly name: string;
}

export class FindOrCreateExamRequestDTO {
    public readonly name: string;
    public readonly key: string;
}

export class UpdateExamRequestDTO {
    public readonly name: string;
}
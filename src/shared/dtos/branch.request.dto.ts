export class CreateBranchRequestDTO {
    public readonly company: number;
    public readonly name: string;
}

export class FindOneOrCreateBranchRequestDTO extends CreateBranchRequestDTO {
    public readonly lookup: number;
}

export class UpdateBranchRequestDTO {
    public readonly name: string;
}

export class UpdateBranchCompanyRequestDTO {
    public readonly company: number;
}
export class FindResult {
    public readonly id: number;
    public readonly examName: string;
    public readonly address: string;
    public readonly morbidity?: number;
    public readonly report?: {
        address?: string
    }
}

export class FindResultsByDoctor {
    public readonly results: FindResult[];
}


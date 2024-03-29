class FindOrderResult {
    public readonly id: number;
    public readonly examName: string;
    public readonly address: string;
}

export class FindOrder {
    public readonly id: number;
    public readonly createAt: Date;
    public readonly patient: string;
    public readonly process: string;
    public readonly results: FindOrderResult[]
}

export class FindOrdersResponseDTO {
    public readonly orders: FindOrder[];
}
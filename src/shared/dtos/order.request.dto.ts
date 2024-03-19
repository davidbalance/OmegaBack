export class CreateOrderRequestDTO {
    public readonly branch: number;
    public readonly patient: number;
    public readonly key: string;
}

export class FindOrCreateOrderRequestDTO {
    public readonly key: string;
}
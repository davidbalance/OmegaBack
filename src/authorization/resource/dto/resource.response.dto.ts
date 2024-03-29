export class FindResource {
    public readonly id: number;
    public readonly name: string;
    public readonly claim: string;
}

export class FindResourcesResponseDTO {
    public readonly resources: FindResource[];
}
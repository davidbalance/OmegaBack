import { Expose, Type } from "class-transformer";

class OrderResultDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly examName: string;

    @Expose()
    public readonly diseaseId?: number;
    
    @Expose()
    public readonly diseaseName?: string;
}

export class FindOrderResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly patientDni: string;

    @Expose()
    public readonly patientFullname: string;

    @Expose()
    public readonly process: string;

    @Expose()
    public readonly createAt: Date;

    @Type(() => OrderResultDTO)
    @Expose()
    public readonly results: OrderResultDTO[]
}

export class FindOrdersResponseDTO {
    @Type(() => FindOrderResponseDTO)
    @Expose()
    public readonly orders: FindOrderResponseDTO[]
}
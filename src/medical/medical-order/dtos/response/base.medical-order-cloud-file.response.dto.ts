import { Expose } from "class-transformer";

export class MedicalOrderCloudFileResponseDto {
    @Expose() public readonly id: number;

    @Expose() public readonly examName: string;

    @Expose() public readonly type: 'result' | 'report';

    @Expose() public readonly hasFile: boolean;
}
import { CreateTestFromExternalSourcePayload } from "@omega/medical/application/service/create-test-from-external-source.service";
import { CreateOrderFromExternalSourceDto } from "./order-external.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTestFromExternalSourceRequestDto
    extends CreateOrderFromExternalSourceDto
    implements Omit<CreateTestFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly testKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string;

    @IsString()
    @IsNotEmpty()
    public readonly examType: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examTypeKey?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSubtypeKey?: string | undefined;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examKey?: string | undefined;
}
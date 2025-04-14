import { CreateTestFromExternalSourcePayload } from "@omega/medical/application/service/create-test-from-external-source.service";
import { CreateOrderFromExternalSourceDto } from "./order-external.dto";
import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateManyTestFromExternalSourcePayload } from "@omega/medical/application/service/create-many-test-from-external-source.service";
import { TestExternalSourceResolverPayload } from "@omega/medical/application/resolver/test-external-source.resolver";
import { Type } from "class-transformer";

export class CreateTestFromExternalSourceRequestDto
    extends CreateOrderFromExternalSourceDto
    implements Omit<CreateTestFromExternalSourcePayload, 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly testKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string = 'Default';

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examType: string = 'Default';

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


class CreateTestItemRequestDto implements Omit<TestExternalSourceResolverPayload, 'orderId' | 'owner'> {
    @IsString()
    @IsNotEmpty()
    public readonly testKey: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string = 'Default';

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly examType: string = 'Default';

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

export class CreateManyTestFromExternalSourceRequestDto
    extends CreateOrderFromExternalSourceDto
    implements Omit<CreateManyTestFromExternalSourcePayload, 'owner'> {

    @IsArray()
    @IsNotEmpty()
    @IsObject({ each: true })
    @ValidateNested({ each: true })
    @Type(() => CreateTestItemRequestDto)
    public readonly tests: CreateTestItemRequestDto[];

}
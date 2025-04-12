import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { Expose, Type } from "class-transformer";
import { ApiKeyResponseDto } from "./base.api-key.response.dto";

export class GetApiKeyArrayResponseDto implements ObjectArrayResponse<ApiKeyResponseDto>{
    @Expose()
    @Type(() => ApiKeyResponseDto)
    public readonly data: ApiKeyResponseDto[];
}
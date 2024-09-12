import { Expose, Type } from "class-transformer";
import { Disease } from "./disease.base.dto";
import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";

export class GetDiseaseArrayResponseDto implements ObjectArrayResponse<Disease> {
    @Expose()
    @Type(() => Disease)
    public readonly data: Disease[];
}
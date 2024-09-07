import { Disease } from "@/disease/disease/dtos/response/disease.base.dto";
import { OmitType } from "@nestjs/mapped-types";
import { Expose, Type } from "class-transformer";

class ExtendedDisease extends OmitType(Disease, ['group']) { }

export class ExtendedDiseaseGroup {
    @Expose() public readonly id: number;

    @Expose() public readonly name: string;

    @Type(() => ExtendedDisease)
    @Expose() public readonly diseases: ExtendedDisease[]
}
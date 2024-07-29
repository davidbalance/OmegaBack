import { IsNotEmpty, IsString } from "class-validator";
import { DiseaseGroupResponseDto } from "./disease-group.dto";

export class POSTDiseaseGroupResponseDto extends DiseaseGroupResponseDto { }

export class POSTDiseaseGroupRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}
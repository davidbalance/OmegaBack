import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { MorbidityGroup } from "src/morbidity/morbidity-group/entities/morbidity-group.entity";

export class CreateMorbidityDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsObject()
    @IsNotEmpty()
    public group: MorbidityGroup;
}

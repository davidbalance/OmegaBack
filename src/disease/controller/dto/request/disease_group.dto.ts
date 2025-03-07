import { DiseaseGroupCreateCommandPayload } from "@omega/disease/application/command/disease/disease-group-create.command";
import { DiseaseGroupEditCommandPayload } from "@omega/disease/application/command/disease/disease-group-edit.command";
import { IsNotEmpty, IsString } from "class-validator";

export class DiseaseGroupCreateRequestDto
    implements DiseaseGroupCreateCommandPayload {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class DiseaseGroupEditRequestDto
    implements Omit<DiseaseGroupEditCommandPayload, 'groupId'> {
    @IsString()
    @IsNotEmpty()
    public readonly groupName: string;
}
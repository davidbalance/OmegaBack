import { DiseaseCreateCommandPayload } from "@omega/disease/application/command/disease/disease-create.command";
import { DiseaseEditCommandPayload } from "@omega/disease/application/command/disease/disease-edit.command";
import { DiseaseMoveToGroupCommandPayload } from "@omega/disease/application/command/disease/disease-move-to-group.command";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DiseaseCreateRequestDto
    implements DiseaseCreateCommandPayload {
    @IsUUID()
    public readonly groupId: string;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;
}

export class DiseaseEditRequestDto implements Omit<DiseaseEditCommandPayload, 'diseaseId' | 'groupId'> {
    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;
}

export class DiseaseMoveToGroupRequestDto implements Omit<DiseaseMoveToGroupCommandPayload, 'fromGroupId' | 'diseaseId'> {
    @IsUUID()
    public readonly toGroupId: string;
}
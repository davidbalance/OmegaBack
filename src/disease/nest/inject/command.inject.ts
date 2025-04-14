import { Inject } from "@nestjs/common";

export const DiseaseCreateCommandToken = 'DiseaseCreateCommand';
export const DiseaseMoveToGroupCommandToken = 'DiseaseMoveToGroupCommand';
export const DiseaseEditCommandToken = 'DiseaseEditCommand';
export const DiseaseRemoveCommandToken = 'DiseaseRemoveCommand';
export const DiseaseGroupCreateCommandToken = 'DiseaseGroupCreateCommand';
export const DiseaseGroupEditCommandToken = 'DiseaseGroupEditCommand';
export const DiseaseGroupRemoveCommandToken = 'DiseaseGroupRemoveCommand';

const command = {
    DiseaseCreate: DiseaseCreateCommandToken,
    DiseaseMoveToGroup: DiseaseMoveToGroupCommandToken,
    DiseaseEdit: DiseaseEditCommandToken,
    DiseaseRemove: DiseaseRemoveCommandToken,
    DiseaseGroupCreate: DiseaseGroupCreateCommandToken,
    DiseaseGroupEdit: DiseaseGroupEditCommandToken,
    DiseaseGroupRemove: DiseaseGroupRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);
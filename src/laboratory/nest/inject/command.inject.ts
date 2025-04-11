import { Inject } from "@nestjs/common";

export const ExamMoveCommandToken = 'ExamMoveCommand';
export const ExamSubtypeMoveCommandToken = 'ExamSubtypeMoveCommand';
export const ExamCreateCommandToken = 'ExamCreateCommand';
export const ExamCreateFromExternalSourceCommandToken = 'ExamCreateFromExternalSourceCommand';
export const ExamEditCommandToken = 'ExamEditCommand';
export const ExamRemoveCommandToken = 'ExamRemoveCommand';
export const ExamSubtypeCreateFromExternalSourceCommandToken = 'ExamSubtypeCreateFromExternalSourceCommand';
export const ExamSubtypeCreateCommandToken = 'ExamSubtypeCreateCommand';
export const ExamSubtypeEditCommandToken = 'ExamSubtypeEditCommand';
export const ExamSubtypeRemoveCommandToken = 'ExamSubtypeRemoveCommand';
export const ExamTypeCreateFromExternalSourceCommandToken = 'ExamTypeCreateFromExternalSourceCommand';
export const ExamTypeCreateCommandToken = 'ExamTypeCreateCommand';
export const ExamTypeEditCommandToken = 'ExamTypeEditCommand';
export const ExamTypeRemoveCommandToken = 'ExamTypeRemoveCommand';

const command = {
    ExamMove: ExamMoveCommandToken,
    ExamCreateFromExternalSource: ExamCreateFromExternalSourceCommandToken,
    ExamSubtypeMove: ExamSubtypeMoveCommandToken,
    ExamCreate: ExamCreateCommandToken,
    ExamEdit: ExamEditCommandToken,
    ExamRemove: ExamRemoveCommandToken,
    ExamSubtypeCreateFromExternalSource: ExamSubtypeCreateFromExternalSourceCommandToken,
    ExamSubtypeCreate: ExamSubtypeCreateCommandToken,
    ExamSubtypeEdit: ExamSubtypeEditCommandToken,
    ExamSubtypeRemove: ExamSubtypeRemoveCommandToken,
    ExamTypeCreateFromExternalSource: ExamTypeCreateFromExternalSourceCommandToken,
    ExamTypeCreate: ExamTypeCreateCommandToken,
    ExamTypeEdit: ExamTypeEditCommandToken,
    ExamTypeRemove: ExamTypeRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);
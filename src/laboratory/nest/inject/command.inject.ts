import { Inject } from "@nestjs/common";

export const ExamMoveCommandToken = 'ExamMoveCommand';
export const ExamSubtypeMoveCommandToken = 'ExamSubtypeMoveCommand';
export const ExamCreateCommandToken = 'ExamCreateCommand';
export const ExamEditCommandToken = 'ExamEditCommand';
export const ExamRemoveCommandToken = 'ExamRemoveCommand';
export const ExamSubtypeCreateCommandToken = 'ExamSubtypeCreateCommand';
export const ExamSubtypeEditCommandToken = 'ExamSubtypeEditCommand';
export const ExamSubtypeRemoveCommandToken = 'ExamSubtypeRemoveCommand';
export const ExamTypeCreateCommandToken = 'ExamTypeCreateCommand';
export const ExamTypeEditCommandToken = 'ExamTypeEditCommand';
export const ExamTypeRemoveCommandToken = 'ExamTypeRemoveCommand';

const command = {
    ExamMove: ExamMoveCommandToken,
    ExamSubtypeMove: ExamSubtypeMoveCommandToken,
    ExamCreate: ExamCreateCommandToken,
    ExamEdit: ExamEditCommandToken,
    ExamRemove: ExamRemoveCommandToken,
    ExamSubtypeCreate: ExamSubtypeCreateCommandToken,
    ExamSubtypeEdit: ExamSubtypeEditCommandToken,
    ExamSubtypeRemove: ExamSubtypeRemoveCommandToken,
    ExamTypeCreate: ExamTypeCreateCommandToken,
    ExamTypeEdit: ExamTypeEditCommandToken,
    ExamTypeRemove: ExamTypeRemoveCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);
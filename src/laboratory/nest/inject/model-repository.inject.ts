import { Inject } from "@nestjs/common";

export const ExamTypeModelRepositoryToken = 'ExamTypeModelRepository';
export const ExamTypeOptionModelRepositoryToken = 'ExamTypeOptionModelRepository';
export const ExamTypeExternalConnectionModelRepositoryToken = 'ExamTypeExternalConnectionModelRepository';

export const ExamSubtypeOptionModelRepositoryToken = 'ExamSubtypeOptionModelRepository';
export const ExamSubtypeModelRepositoryToken = 'ExamSubtypeModelRepository';
export const ExamSubtypeExternalConnectionModelRepositoryToken = 'ExamSubtypeExternalConnectionModelRepository';

export const ExamModelRepositoryToken = 'ExamModelRepository';
export const ExamExternalConnectionModelRepositoryToken = 'ExamExternalConnectionModelRepository';

const repository = {
    ExamType: ExamTypeModelRepositoryToken,
    ExamTypeOption: ExamTypeOptionModelRepositoryToken,
    ExamTypeExternalConnection: ExamTypeExternalConnectionModelRepositoryToken,
    ExamSubtype: ExamSubtypeModelRepositoryToken,
    ExamSubtypeOption: ExamSubtypeOptionModelRepositoryToken,
    ExamSubtypeExternalConnection: ExamSubtypeExternalConnectionModelRepositoryToken,
    Exam: ExamModelRepositoryToken,
    ExamExternalConnection: ExamExternalConnectionModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);
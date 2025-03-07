import { Inject } from "@nestjs/common";

export const ExamSubtypeOptionModelRepositoryToken = 'ExamSubtypeOptionModelRepository';
export const ExamSubtypeModelRepositoryToken = 'ExamSubtypeModelRepository';
export const ExamTypeModelRepositoryToken = 'ExamTypeModelRepository';
export const ExamTypeOptionModelRepositoryToken = 'ExamTypeOptionModelRepository';
export const ExamModelRepositoryToken = 'ExamModelRepository';

const repository = {
    ExamSubtypeOption: ExamSubtypeOptionModelRepositoryToken,
    ExamSubtype: ExamSubtypeModelRepositoryToken,
    ExamType: ExamTypeModelRepositoryToken,
    ExamTypeOption: ExamTypeOptionModelRepositoryToken,
    Exam: ExamModelRepositoryToken,
}

export const InjectModelRepository = (token: keyof typeof repository) => Inject(repository[token]);
import { Inject } from "@nestjs/common";

export const ExamTypeAggregateRepositoryToken = 'ExamTypeAggregateRepository';

const repository = {
    ExamType: ExamTypeAggregateRepositoryToken
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);
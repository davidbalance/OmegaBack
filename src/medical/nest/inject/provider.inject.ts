import { Inject } from "@nestjs/common";

export const ExamColumnToken = 'ExamColumn';

const provider = {
    ExamColumn: ExamColumnToken
}

export const InjectProvider = (token: keyof typeof provider) => Inject(provider[token]);
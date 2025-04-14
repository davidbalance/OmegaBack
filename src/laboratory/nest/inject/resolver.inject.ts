import { Inject } from "@nestjs/common";

export const ExamTypeExternalSourceResolverToken = 'ExamTypeExternalSourceResolver';
export const ExamSubtypeExternalSourceResolverToken = 'ExamSubtypeExternalSourceResolver';
export const ExamExternalSourceResolverToken = 'ExamExternalSourceResolver';

const resolver = {
    ExamTypeExternalSource: ExamTypeExternalSourceResolverToken,
    ExamSubtypeExternalSource: ExamSubtypeExternalSourceResolverToken,
    ExamExternalSource: ExamExternalSourceResolverToken,
}

export const InjectResolver = (token: keyof typeof resolver) => Inject(resolver[token]);
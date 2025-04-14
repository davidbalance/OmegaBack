import { Inject } from "@nestjs/common";

export const CreateExamFromExternalSourceServiceToken = 'CreateExamFromExternalSourceService';
export const CreateExamSubtypeFromExternalSourceServiceToken = 'CreateExamSubtypeFromExternalSourceService';
export const CreateExamTypeFromExternalSourceServiceToken = 'CreateExamTypeFromExternalSourceService';

const service = {
    CreateExamFromExternalSource: CreateExamFromExternalSourceServiceToken,
    CreateExamSubtypeFromExternalSource: CreateExamSubtypeFromExternalSourceServiceToken,
    CreateExamTypeFromExternalSource: CreateExamTypeFromExternalSourceServiceToken,
}

export const InjectService = (token: keyof typeof service) => Inject(service[token]);
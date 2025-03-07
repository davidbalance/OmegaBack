import { Inject } from "@nestjs/common";

export const ExamFindManyQueryToken = 'ExamFindManyQuery';
export const ExamFindOneQueryToken = 'ExamFindOneQuery';
export const ExamSubtypeFindManyQueryToken = 'ExamSubtypeFindManyQuery';
export const ExamSubtypeFindOneQueryToken = 'ExamSubtypeFindOneQuery';
export const ExamTypeFindManyQueryToken = 'ExamTypeFindManyQuery';
export const ExamTypeFindOneQueryToken = 'ExamTypeFindOneQuery';
export const ExamTypeFindOptionsQueryToken = 'ExamTypeFindOptionsQuery';

const query = {
    ExamFindMany: ExamFindManyQueryToken,
    ExamFindOne: ExamFindOneQueryToken,
    ExamSubtypeFindMany: ExamSubtypeFindManyQueryToken,
    ExamSubtypeFindOne: ExamSubtypeFindOneQueryToken,
    ExamTypeFindMany: ExamTypeFindManyQueryToken,
    ExamTypeFindOne: ExamTypeFindOneQueryToken,
    ExamTypeFindOptions: ExamTypeFindOptionsQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);
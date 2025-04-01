import { Inject } from "@nestjs/common";

export const ExamTypeFindManyQueryToken = 'ExamTypeFindManyQuery';
export const ExamTypeFindOneQueryToken = 'ExamTypeFindOneQuery';
export const ExamTypeFindOptionsQueryToken = 'ExamTypeFindOptionsQuery';
export const ExamTypeFindOneByExternalKeyQueryToken = 'ExamTypeFindOneByExternalKeyQuery';

export const ExamSubtypeFindManyQueryToken = 'ExamSubtypeFindManyQuery';
export const ExamSubtypeFindOneQueryToken = 'ExamSubtypeFindOneQuery';
export const ExamSubtypeFindOneByExternalKeyQueryToken = 'ExamSubtypeFindOneByExternalKeyQuery';

export const ExamFindManyQueryToken = 'ExamFindManyQuery';
export const ExamFindOneQueryToken = 'ExamFindOneQuery';
export const ExamFindOneByExternalKeyQueryToken = 'ExamFindOneByExternalKeyQuery';

const query = {
    ExamTypeFindMany: ExamTypeFindManyQueryToken,
    ExamTypeFindOne: ExamTypeFindOneQueryToken,
    ExamTypeFindOptions: ExamTypeFindOptionsQueryToken,
    ExamTypeFindOneByExternalKey: ExamTypeFindOneByExternalKeyQueryToken,

    ExamSubtypeFindMany: ExamSubtypeFindManyQueryToken,
    ExamSubtypeFindOne: ExamSubtypeFindOneQueryToken,
    ExamSubtypeFindOneByExternalKey: ExamSubtypeFindOneByExternalKeyQueryToken,

    ExamFindMany: ExamFindManyQueryToken,
    ExamFindOne: ExamFindOneQueryToken,
    ExamFindOneByExternalKey: ExamFindOneByExternalKeyQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);
import { Inject } from "@nestjs/common";

export const DiseaseFindManyQueryToken = 'DiseaseFindManyQuery';
export const DiseaseFindOneQueryToken = 'DiseaseFindOneQuery';
export const DiseaseGroupFindManyQueryToken = 'DiseaseGroupFindManyQuery';
export const DiseaseGroupFindOneQueryToken = 'DiseaseGroupFindOneQuery';
export const DiseaseGroupFindOptionsQueryToken = 'DiseaseGroupFindOptionsQuery';

const query = {
    DiseaseFindManyQuery: DiseaseFindManyQueryToken,
    DiseaseFindOneQuery: DiseaseFindOneQueryToken,
    DiseaseGroupFindManyQuery: DiseaseGroupFindManyQueryToken,
    DiseaseGroupFindOneQuery: DiseaseGroupFindOneQueryToken,
    DiseaseGroupFindOptionsQuery: DiseaseGroupFindOptionsQueryToken,
}

export const InjectQuery = (token: keyof typeof query) => Inject(query[token]);
import { IncrementDomain } from "../domain/increment.domain";

export interface IncrementRepository {
    findOne(key: string): Promise<IncrementDomain | null>;
    saveAsync(value: IncrementDomain): Promise<void>;
}


export const IncrementRepositoryToken = 'IncrementRepository';

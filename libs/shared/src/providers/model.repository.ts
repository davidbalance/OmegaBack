import { Filter, FilterGroup, SearchCriteria } from "../domain/search.builder";

export interface ModelRepository<T extends object> {
    findManyAsync(filter: SearchCriteria<T>): Promise<Array<T>>;
    findOneAsync(filter: Array<FilterGroup<T> | Filter<T>>): Promise<T | null>;
}

export interface CountRepository<T extends object> {
    countAsync(filter: Array<FilterGroup<T> | Filter<T>>): Promise<number>;
}
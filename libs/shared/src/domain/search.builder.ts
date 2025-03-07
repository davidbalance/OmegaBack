
export type FilterOperator = 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'likeStart' | 'likeEnd' | 'in';

export interface Filter<T> {
    field: keyof T;
    operator: FilterOperator;
    value: unknown;
}

export interface Pagination {
    skip?: number;
    limit?: number;
}

export type Ordering<T extends object> = Partial<Record<keyof T, 'asc' | 'desc'>>;

export type Order<T extends object> = {
    order?: Ordering<T>
}

export type FilterGroupOperator = 'and' | 'or';

export interface FilterGroup<T> {
    filter: Array<Filter<T>>;
    operator: FilterGroupOperator;
}

export interface SearchCriteria<T extends object> extends Pagination {
    filter: Array<FilterGroup<T> | Filter<T>>
    order?: Ordering<T>;
    // operator: 'and' | 'or'
}

export class FilterValidator {
    public static isFilterGroup<T>(value: Filter<T> | FilterGroup<T>): value is FilterGroup<T> {
        return value.operator === 'and' || value.operator === 'or';
    }

    public static isFilter<T>(value: Filter<T> | FilterGroup<T>): value is Filter<T> {
        return value.operator !== 'and' && value.operator !== 'or';
    }
}
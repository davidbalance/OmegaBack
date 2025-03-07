import { FilterGroup, Filter, FilterValidator } from "@shared/shared/domain";

export class PrismaFilterMapper {

    public static map<T extends object, R extends object>(filter: Array<FilterGroup<T> | Filter<T>>): R {
        const baseFilter: unknown[] = [];
        for (const value of filter) {
            if (FilterValidator.isFilterGroup<T>(value)) {
                baseFilter.push(PrismaFilterMapper.toGroup<T, R>(value));
            } else {
                baseFilter.push(PrismaFilterMapper.toWhere<T, R>(value));
            }
        }
        return { AND: baseFilter } as R;
    }

    private static toGroup<T extends object, R extends object>(value: FilterGroup<T>): R {
        switch (value.operator) {
            case "and":
                return { AND: value.filter.map(e => PrismaFilterMapper.toWhere<T, R>(e)) } as R
            case "or":
                return { OR: value.filter.map(e => PrismaFilterMapper.toWhere<T, R>(e)) } as R
        }
    }

    private static toWhere<T extends object, R extends object>(value: Filter<T>): R {
        switch (value.operator) {
            case "eq":
                return { [value.field]: { equals: value.value } } as R;
            case "gt":
                return { [value.field]: { gt: value.value } } as R;
            case "lt":
                return { [value.field]: { lt: value.value } } as R;
            case "gte":
                return { [value.field]: { gte: value.value } } as R;
            case "lte":
                return { [value.field]: { lte: value.value } } as R;
            case "like":
                return { [value.field]: { contains: value.value } } as R;
            case "likeStart":
                return { [value.field]: { startsWith: value.value } } as R;
            case "likeEnd":
                return { [value.field]: { endsWith: value.value } } as R;
            case "in":
                return { [value.field]: { in: value.value } } as R;
        }
    }

}
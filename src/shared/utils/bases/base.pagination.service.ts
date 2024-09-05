import { SelectQueryBuilder } from "typeorm";
import { CountMetaDto, FilterMetaDto } from "./base.pagination.dto";

export abstract class BasePaginationService<T, K> {

    protected abstract queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<T>;

    protected transform(data: any[]): K[] {
        return data;
    }

    async find({ page, take, field, order = 'asc', search = '' }: FilterMetaDto, extras?: any | undefined): Promise<K[]> {
        const query = this.queryBuilder(search, extras);

        if (field) {
            query.orderBy(field, order.toUpperCase() as any);
        }

        const data = await query
            .limit(take)
            .offset(page)
            .getRawMany();

        const transformed = this.transform(data);
        return transformed;
    }

    async count({ search = '', take }: CountMetaDto, extras?: any | undefined): Promise<number> {
        const query = this.queryBuilder(search, extras);
        const count = await query.getCount();
        return Math.ceil(count / take);
    }
}
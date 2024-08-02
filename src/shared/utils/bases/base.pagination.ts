import { PaginationOrder } from "./base.pagination.dto";

export enum PaginationOrderEnum {
    DESC = "DESC",
    ASC = "ASC"
}

export interface PaginationResponse<T> {
    pages: number;
    data: T[];
}

export interface IPagination<T> {
    findPaginatedDataAndPageCount(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<[value: number, data: T[]]> | [value: number, data: T[]];
    findPaginatedByFilter(page: number, limit: number, filter?: string, order?: PaginationOrder): Promise<T[]> | T[];
    findPageCount(limit: number, filter?: string): Promise<number> | number;
}
export interface PaginationResponse<T extends object> {
    data: T[];
    amount: number;
}

export interface OrderingQuery<T extends object> {
    orderField?: keyof T;
    orderValue?: 'asc' | 'desc';
}
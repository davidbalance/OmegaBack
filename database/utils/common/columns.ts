import { TableColumnOptions } from "typeorm";

export const CREATE_AT: TableColumnOptions = {
    name: 'create_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP'
};

export const UPDATE_AT: TableColumnOptions = {
    name: 'update_at',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP'
}

export const EXTERNAL_KEY_SOURCE: TableColumnOptions = {
    name: 'external_source',
    type: 'varchar',
    length: '128',
    isNullable: false
}

export const EXTERNAL_KEY_KEY: TableColumnOptions = {
    name: 'external_key',
    type: 'varchar',
    length: '256',
    isNullable: false
}
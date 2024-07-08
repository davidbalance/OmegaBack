import { TableColumnOptions, TableIndex } from "typeorm";
import { EXTERNAL_KEY_KEY, EXTERNAL_KEY_SOURCE } from "./columns";

export const EXTERNAL_KEY_SOURCE_INDEX: TableIndex = new TableIndex({
    name: 'external_key_source_key_idx',
    columnNames: [EXTERNAL_KEY_SOURCE.name, EXTERNAL_KEY_KEY.name],
    isUnique: true
});
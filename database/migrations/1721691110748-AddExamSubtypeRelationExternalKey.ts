import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_lab_exam_subtype';

const TABLE_COLUMN_EXTERNAL_KEY: TableColumn = new TableColumn({
    name: 'external_key',
    type: 'int',
    isNullable: true
});

const FK_LAB_EXTERNAL_SUBTYPE: TableForeignKey = new TableForeignKey({
    name: 'fk_lab_external_subtype',
    columnNames: ['external_key'],
    referencedColumnNames: ['exam_subtype_external_key_id'],
    referencedTableName: 'tbl_lab_exam_subtype_external_key'
});

export class AddExamSubtypeRelationExternalKey1721691110748 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, TABLE_COLUMN_EXTERNAL_KEY);
        await queryRunner.createForeignKey(TABLE_NAME, FK_LAB_EXTERNAL_SUBTYPE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LAB_EXTERNAL_SUBTYPE);
        await queryRunner.dropColumn(TABLE_NAME, TABLE_COLUMN_EXTERNAL_KEY);
    }

}

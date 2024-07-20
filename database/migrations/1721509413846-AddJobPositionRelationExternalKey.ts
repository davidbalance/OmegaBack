import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_job_position';

const TABLE_COLUMN_EXTERNAL_KEY: TableColumn = new TableColumn({
    name: 'external_key',
    type: 'int',
    isNullable: true
});

const FK_M_EXTERNAL_ORDER: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_external_job_position',
    columnNames: ['external_key'],
    referencedColumnNames: ['job_position_external_key_id'],
    referencedTableName: 'tbl_lo_job_position_external_key'
});

export class AddJobPositionRelationExternalKey1721509413846 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, TABLE_COLUMN_EXTERNAL_KEY);
        await queryRunner.createForeignKey(TABLE_NAME, FK_M_EXTERNAL_ORDER);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_EXTERNAL_ORDER);
        await queryRunner.dropColumn(TABLE_NAME, TABLE_COLUMN_EXTERNAL_KEY);
    }

}

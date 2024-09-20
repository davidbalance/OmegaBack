import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_orders';

const HAS_FILE_COLUMN = new TableColumn({
    name: 'order_has_file',
    type: 'boolean',
    default: false,
    isNullable: false
});

export class AddHasFileFieldInMedicalOrder1726864838720 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, HAS_FILE_COLUMN);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE_NAME, HAS_FILE_COLUMN);
    }

}

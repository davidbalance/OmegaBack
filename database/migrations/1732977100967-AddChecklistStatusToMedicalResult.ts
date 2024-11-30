import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_results';
const COLUMN_NAME: string = 'checklist_status';

export class AddChecklistStatusToMedicalResult1732977100967 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: COLUMN_NAME,
            type: 'boolean',
            default: false,
            isNullable: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE_NAME, COLUMN_NAME);
    }

}

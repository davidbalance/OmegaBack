import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME = 'tbl_m_client';

export class AddMedicalClientFieldsJobPositionName1721434347660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: 'job_position_name',
            type: 'varchar',
            length: '128',
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE_NAME, 'job_position_name');
    }

}

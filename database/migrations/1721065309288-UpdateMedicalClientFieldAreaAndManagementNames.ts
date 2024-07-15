import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_client';

export class UpdateMedicalClientFieldAreaAndManagementNames1721065309288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(TABLE_NAME, 'location_area_name', new TableColumn({
            name: 'location_management_name',
            type: 'varchar',
            length: '128',
            isNullable: true
        }));
        await queryRunner.changeColumn(TABLE_NAME, 'location_management_name', new TableColumn({
            name: 'location_management_name',
            type: 'varchar',
            length: '128',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

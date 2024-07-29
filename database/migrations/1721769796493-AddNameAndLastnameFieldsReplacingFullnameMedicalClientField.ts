import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_client';

export class AddNameAndLastnameFieldsReplacingFullnameMedicalClientField1721769796493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE_NAME, 'medical_client_fullname');
        await queryRunner.addColumns(TABLE_NAME, [
            new TableColumn({
                name: 'medical_client_name',
                type: 'varchar',
                length: '128',
                isNullable: false
            }),
            new TableColumn({
                name: 'medical_client_lastname',
                type: 'varchar',
                length: '128',
                isNullable: false
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns(TABLE_NAME, ['medical_client_name', 'medical_client_lastname']);
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: 'medical_client_fullname',
            type: 'varchar',
            length: '128',
            isNullable: false
        }));
    }

}

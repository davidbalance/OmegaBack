import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_u_users';

export class AddDniTypeIntoUserTable1724965432283 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: 'user_dni_type',
            type: 'char',
            length: '3',
            isNullable: true,
            default: null
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(TABLE_NAME, 'user_dni_type');
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_u_doctors';

const FK_U_USER_DOCTOR: TableForeignKey = new TableForeignKey({
    name: 'fk_u_user_doctor',
    columnNames: ['user_id'],
    referencedColumnNames: ['user_id'],
    referencedTableName: 'tbl_u_users'
});

export class CreateUserDoctorsTable1720554488246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'doctor_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'doctor_signature',
                        type: 'varchar',
                        length: '256',
                        isNullable: true
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_U_USER_DOCTOR);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_U_USER_DOCTOR);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

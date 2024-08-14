import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_u_doctors';

const FK_U_USER_DOCTOR: TableForeignKey = new TableForeignKey({
    name: 'fk_u_user_doctor',
    columnNames: ['user_dni'],
    referencedColumnNames: ['user_dni'],
    referencedTableName: 'tbl_u_users'
});

const IDX_USER: TableIndex = new TableIndex({
    name: 'idx_doctor_user',
    columnNames: ['user_dni'],
    isUnique: true
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
                        name: 'user_dni',
                        type: 'varchar',
                        length: '10',
                        isUnique: true,
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, IDX_USER);

        await queryRunner.createForeignKey(TABLE_NAME, FK_U_USER_DOCTOR);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_U_USER_DOCTOR);

        await queryRunner.dropIndex(TABLE_NAME, IDX_USER);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

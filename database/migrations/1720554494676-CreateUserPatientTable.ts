import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_u_patients';

const FK_U_USER_PATIENT: TableForeignKey = new TableForeignKey({
    name: 'fk_u_user_patient',
    columnNames: ['user_dni'],
    referencedColumnNames: ['user_dni'],
    referencedTableName: 'tbl_u_users'
});

const IDX_USER: TableIndex = new TableIndex({
    name: 'idx_patient_user',
    columnNames: ['user_dni'],
    isUnique: true
});

export class CreateUserPatientTable1720554494676 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'patient_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'patient_gender',
                        type: 'enum',
                        enum: ['male', 'female'],
                        isNullable: false
                    },
                    {
                        name: 'patient_birthday',
                        type: 'date',
                        isNullable: false
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

        await queryRunner.createForeignKey(TABLE_NAME, FK_U_USER_PATIENT);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_U_USER_PATIENT);

        await queryRunner.dropIndex(TABLE_NAME, IDX_USER);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

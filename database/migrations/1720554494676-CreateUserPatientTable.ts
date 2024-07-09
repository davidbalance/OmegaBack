import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_u_patients';

const FK_U_USER_PATIENT: TableForeignKey = new TableForeignKey({
    name: 'fk_u_user_patient',
    columnNames: ['user_id'],
    referencedColumnNames: ['user_id'],
    referencedTableName: 'tbl_u_users'
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
                        name: 'user_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_U_USER_PATIENT);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_U_USER_PATIENT);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

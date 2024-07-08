import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePatientTable1720468479786 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_u_patients',
            columns: [
                {
                    name: 'patient_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'patient_gender',
                    type: 'enum',
                    enum: ['Male', 'Female', 'Other'],
                    default: "'Other'"
                },
                {
                    name: 'patient_birthday',
                    type: 'date'
                },
                {
                    name: 'user_id',
                    type: 'int'
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true);

        await queryRunner.createForeignKey('tbl_u_patients', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'tbl_u_users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_u_patients', 'FK_tbl_u_patients_user_id');
        await queryRunner.dropTable('tbl_u_patients');
    }

}

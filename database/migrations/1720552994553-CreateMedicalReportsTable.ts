import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_reports';
const INDEX_DOCTOR: TableIndex = new TableIndex({ name: 'idx_report_doctor', columnNames: ['doctor_dni'] });
const INDEX_PATIENT: TableIndex = new TableIndex({ name: 'idx_report_patient', columnNames: ['patient_dni'] });
const INDEX_DOCTOR_PATIENT: TableIndex = new TableIndex({ name: 'idx_report_doctor_patient', columnNames: ['doctor_dni', 'patient_dni'] });

export class CreateMedicalReportsTable1720552994553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'report_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'report_file_address',
                        type: 'varchar',
                        length: '256',
                        isNullable: true
                    },
                    {
                        name: 'report_content',
                        type: 'varchar',
                        length: '8192',
                        isNullable: false
                    },
                    {
                        name: 'report_has_file',
                        type: 'boolean',
                        default: false,
                        isNullable: false
                    },
                    {
                        name: 'order_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'patient_dni',
                        type: 'varchar',
                        length: '10',
                        isNullable: false
                    },
                    {
                        name: 'patient_fullname',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'patient_birthday',
                        type: 'date',
                        isNullable: false
                    },
                    {
                        name: 'exam_name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'doctor_dni',
                        type: 'varchar',
                        length: '10',
                        isNullable: false
                    },
                    {
                        name: 'doctor_fullname',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'doctor_signature',
                        type: 'varchar',
                        length: '256',
                        isNullable: false
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_PATIENT);
        await queryRunner.createIndex(TABLE_NAME, INDEX_DOCTOR);
        await queryRunner.createIndex(TABLE_NAME, INDEX_DOCTOR_PATIENT);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_PATIENT);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_DOCTOR);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_DOCTOR_PATIENT);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

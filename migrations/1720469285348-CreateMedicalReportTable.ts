import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateMedicalReportTable1720469285348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_reports',
            columns: [
                {
                    name: 'report_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
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

        await queryRunner.createIndex('tbl_m_reports', new TableIndex({
            name: 'report_doctor_dni_idx',
            columnNames: ['doctor_dni', 'patient_dni'],
            isUnique: false
        }));

        await queryRunner.createIndex('tbl_m_reports', new TableIndex({
            name: 'report_patient_idx',
            columnNames: ['patient_dni'],
            isUnique: false
        }));

        await queryRunner.createIndex('tbl_m_reports', new TableIndex({
            name: 'report_doctor_idx',
            columnNames: ['doctor_dni'],
            isUnique: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_m_reports', 'report_doctor_dni_idx');
        await queryRunner.dropIndex('tbl_m_reports', 'report_patient_idx');
        await queryRunner.dropIndex('tbl_m_reports', 'report_doctor_idx');
        await queryRunner.dropTable('tbl_m_reports');
    }

}

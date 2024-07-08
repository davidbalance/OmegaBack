import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateMedicalResultTable1720468987888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_results',
            columns: [
                {
                    name: 'result_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'result_file_path',
                    type: 'varchar',
                    length: '512',
                    isNullable: true,
                    isUnique: true
                },
                {
                    name: 'result_has_file',
                    type: 'boolean',
                    default: false,
                    isNullable: false
                },
                {
                    name: 'exam_name',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'disease_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'disease_name',
                    type: 'varchar',
                    length: '128',
                    isNullable: true
                },
                {
                    name: 'disease_commentary',
                    type: 'varchar',
                    length: '512',
                    isNullable: true
                },
                {
                    name: 'disease_group_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'disease_group_name',
                    type: 'varchar',
                    length: '128',
                    isNullable: true
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
                    length: '512',
                    isNullable: false
                },
                {
                    name: 'order_id',
                    type: 'int'
                },
                {
                    name: 'report_id',
                    type: 'int',
                    isNullable: true
                },
                {
                    name: 'external_key_id',
                    type: 'int',
                    isNullable: true
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

        await queryRunner.createIndex('tbl_m_results', new TableIndex({
            name: 'result_disease_idx',
            columnNames: ['disease_id']
        }));

        await queryRunner.createIndex('tbl_m_results', new TableIndex({
            name: 'result_disease_group_idx',
            columnNames: ['disease_group_id']
        }));

        await queryRunner.createIndex('tbl_m_results', new TableIndex({
            name: 'result_doctor_dni_idx',
            columnNames: ['doctor_dni']
        }));

        await queryRunner.createForeignKey('tbl_m_results', new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'tbl_m_orders',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_m_results', new TableForeignKey({
            columnNames: ['report_id'],
            referencedColumnNames: ['report_id'],
            referencedTableName: 'tbl_medical_reports',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_m_results', new TableForeignKey({
            columnNames: ['external_key_id'],
            referencedColumnNames: ['order_external_key_id'],
            referencedTableName: 'tbl_m_order_external_key',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_send_attributes', new TableForeignKey({
            columnNames: ['result_id'],
            referencedColumnNames: ['result_id'],
            referencedTableName: 'tbl_m_results',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_send_attributes', 'FK_tbl_send_attributes_result_id');
        await queryRunner.dropForeignKey('tbl_m_results', 'FK_tbl_m_results_order_id');
        await queryRunner.dropForeignKey('tbl_m_results', 'FK_tbl_m_results_report_id');
        await queryRunner.dropForeignKey('tbl_m_results', 'FK_tbl_m_results_external_key_id');
        await queryRunner.dropIndex('tbl_m_results', 'result_disease_idx');
        await queryRunner.dropIndex('tbl_m_results', 'result_disease_group_idx');
        await queryRunner.dropIndex('tbl_m_results', 'result_doctor_dni_idx');
        await queryRunner.dropTable('tbl_m_results');
    }

}

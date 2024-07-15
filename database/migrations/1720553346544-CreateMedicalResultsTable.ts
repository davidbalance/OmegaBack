import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_results';
const INDEX_DOCTOR: TableIndex = new TableIndex({ name: 'idx_result_doctor_dni', columnNames: ['doctor_dni'] });

const FK_M_ORDER_RESULT: TableForeignKey = new TableForeignKey({
    name: 'fk_m_order_result',
    columnNames: ['order_id'],
    referencedColumnNames: ['order_id'],
    referencedTableName: 'tbl_m_orders'
});

const FK_M_REPORT_RESULT: TableForeignKey = new TableForeignKey({
    name: 'fk_m_report_result',
    columnNames: ['report_id'],
    referencedColumnNames: ['report_id'],
    referencedTableName: 'tbl_m_reports'
});

const FK_M_EXTERNAL_RESULT: TableForeignKey = new TableForeignKey({
    name: 'fk_m_external_result',
    columnNames: ['external_key'],
    referencedColumnNames: ['result_external_key_id'],
    referencedTableName: 'tbl_m_result_external_key'
});

export class CreateMedicalResultsTable1720553346544 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'result_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
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
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'report_id',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'external_key',
                        type: 'int',
                        isNullable: true
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_DOCTOR);

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_ORDER_RESULT);
        await queryRunner.createForeignKey(TABLE_NAME, FK_M_REPORT_RESULT);
        await queryRunner.createForeignKey(TABLE_NAME, FK_M_EXTERNAL_RESULT);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_ORDER_RESULT);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_REPORT_RESULT);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_EXTERNAL_RESULT);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_DOCTOR);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

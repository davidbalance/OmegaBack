import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMedicalReportSendAttributeTable1720469636618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_reports_send_attributes',
            columns: [
                {
                    name: 'report_send_attribute_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'send_attribute_value',
                    type: 'varchar',
                    length: '128',
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
                },
                {
                    name: 'reportId',
                    type: 'int'
                }
            ]
        }), true);

        await queryRunner.createForeignKey('tbl_m_reports_send_attributes', new TableForeignKey({
            columnNames: ['reportId'],
            referencedColumnNames: ['report_id'],
            referencedTableName: 'tbl_m_reports',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_m_reports_send_attributes', 'FK_tbl_m_reports_send_attributes_reportId');
        await queryRunner.dropTable('tbl_m_reports_send_attributes');
    }

}

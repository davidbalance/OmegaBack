import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_reports_send_attributes';
const INDEX_ATTRIBUTE_VALE: TableIndex = new TableIndex({ name: 'idx_send_attribute_value', columnNames: ['send_attribute_value'] });

const FK_M_REPORT_SEND: TableForeignKey = new TableForeignKey({
    name: 'fk_m_report_send',
    columnNames: ['report_id'],
    referencedColumnNames: ['report_id'],
    referencedTableName: 'tbl_m_reports'
});

export class CreateMedicalReportSendAttributesTable1720553029367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'send_attribute_value', type: 'varchar', length: '128', isNullable: false },
                    { name: 'report_send_attribute_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'report_id',
                        type: 'int',
                        isNullable: false
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_ATTRIBUTE_VALE);

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_REPORT_SEND);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_REPORT_SEND);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_ATTRIBUTE_VALE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

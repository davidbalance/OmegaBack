import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_result_send_attributes';
const INDEX_ATTRIBUTE_VALUE: TableIndex = new TableIndex({ name: 'idx_send_attribute_value', columnNames: ['send_attribute_value'] });

const FK_M_REPORT_SEND: TableForeignKey = new TableForeignKey({
    name: 'fk_m_result_send',
    columnNames: ['result_id'],
    referencedColumnNames: ['result_id'],
    referencedTableName: 'tbl_m_results'
});

export class CreateMedicalResultSendAttributesTable1720553352468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'send_attribute_value', type: 'varchar', length: '128', isNullable: false },
                    { name: 'result_send_attribute_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'result_id',
                        type: 'int',
                        isNullable: false
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_ATTRIBUTE_VALUE);

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_REPORT_SEND);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_REPORT_SEND);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_ATTRIBUTE_VALUE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

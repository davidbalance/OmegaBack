import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMedicalResultSendAttributeTable1720469185645 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_result_send_attributes',
            columns: [
                {
                    name: 'result_send_attribute_id',
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
                    name: 'result_id',
                    type: 'int'
                }
            ]
        }), true);

        await queryRunner.createForeignKey('tbl_m_result_send_attributes', new TableForeignKey({
            columnNames: ['result_id'],
            referencedColumnNames: ['result_id'],
            referencedTableName: 'tbl_m_results',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_m_result_send_attributes', 'FK_tbl_m_result_send_attributes_result_id');
        await queryRunner.dropTable('tbl_m_result_send_attributes');
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateMedicalOrderTable1720468802204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_orders',
            columns: [
                {
                    name: 'order_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'corporative_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'company_ruc',
                    type: 'varchar',
                    length: '13',
                    isNullable: false
                },
                {
                    name: 'company_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'branch_name',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'process_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                },
                {
                    name: 'mail_status',
                    type: 'boolean',
                    default: false,
                    isNullable: false
                },
                {
                    name: 'medical_client_id',
                    type: 'int'
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

        await queryRunner.createIndex('tbl_m_orders', new TableIndex({
            name: 'medical_order_client_idx',
            columnNames: ['medical_client_id']
        }));

        await queryRunner.createIndex('tbl_m_orders', new TableIndex({
            name: 'medical_order_external_key_idx',
            columnNames: ['external_key_id']
        }));

        await queryRunner.createForeignKey('tbl_m_orders', new TableForeignKey({
            columnNames: ['medical_client_id'],
            referencedColumnNames: ['medical_client_id'],
            referencedTableName: 'tbl_m_client',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_m_orders', new TableForeignKey({
            columnNames: ['external_key_id'],
            referencedColumnNames: ['external_key_id'],
            referencedTableName: 'tbl_external_keys',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_medical_results', new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'tbl_m_orders',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_medical_results', 'FK_tbl_medical_results_order_id');
        await queryRunner.dropForeignKey('tbl_m_orders', 'FK_tbl_m_orders_medical_client_id');
        await queryRunner.dropForeignKey('tbl_m_orders', 'FK_tbl_m_orders_external_key_id');
        await queryRunner.dropIndex('tbl_m_orders', 'medical_order_client_idx');
        await queryRunner.dropIndex('tbl_m_orders', 'medical_order_external_key_idx');
        await queryRunner.dropTable('tbl_m_orders');
    }

}

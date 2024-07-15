import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_orders';
const INDEX_COMPANY_RUC: TableIndex = new TableIndex({ name: 'idx_company_ruc', columnNames: ['company_ruc'] });

const FK_M_CLIENT_ORDER: TableForeignKey = new TableForeignKey({
    name: 'fk_m_client_order',
    columnNames: ['medical_client_id'],
    referencedColumnNames: ['medical_client_id'],
    referencedTableName: 'tbl_m_client'
});

const FK_M_EXTERNAL_ORDER: TableForeignKey = new TableForeignKey({
    name: 'fk_m_external_order',
    columnNames: ['external_key'],
    referencedColumnNames: ['order_external_key_id'],
    referencedTableName: 'tbl_m_order_external_key'
});

export class CreateMedicalOrdersTable1720541860293 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'order_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
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
                        name: 'order_status',
                        type: 'enum',
                        enum: ["created", "validated"],
                        default: "created",
                        isNullable: false
                    },
                    {
                        name: 'external_key',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'medical_client_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_COMPANY_RUC);

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_CLIENT_ORDER);
        await queryRunner.createForeignKey(TABLE_NAME, FK_M_EXTERNAL_ORDER);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_CLIENT_ORDER);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_EXTERNAL_ORDER);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_COMPANY_RUC);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

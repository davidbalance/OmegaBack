import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMedicalOrderExternalKeyTable1720468895417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_order_external_key',
            columns: [
                {
                    name: 'order_external_key_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'external_source',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'external_key',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tbl_m_order_external_key');
    }

}

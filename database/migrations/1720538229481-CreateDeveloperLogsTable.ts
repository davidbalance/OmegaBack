import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_developer_logs';

const INDEX_LEVEL: TableIndex = new TableIndex({ name: 'idx_log_level', columnNames: ['log_level'] });
const INDEX_TIMESTAMP: TableIndex = new TableIndex({ name: 'idx_log_timestamp', columnNames: ['log_timestamp'] });
const INDEX_LEVEL_TIMESTAMP: TableIndex = new TableIndex({ name: 'idx_log_level_timestamp', columnNames: ['log_level', 'log_timestamp'] });

export class CreateDeveloperLogsTable1720538229481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'log_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'log_level',
                        type: 'varchar',
                        length: '32'
                    },
                    {
                        name: 'log_message',
                        type: 'varchar',
                        length: '512'
                    },
                    {
                        name: 'log_timestamp',
                        type: 'timestamp'
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_LEVEL);
        await queryRunner.createIndex(TABLE_NAME, INDEX_TIMESTAMP);
        await queryRunner.createIndex(TABLE_NAME, INDEX_LEVEL_TIMESTAMP);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_LEVEL);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_TIMESTAMP);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_LEVEL_TIMESTAMP);
        
        await queryRunner.dropTable(TABLE_NAME);
    }

}

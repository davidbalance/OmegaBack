import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDeveloperLogsTable1720467701098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_developer_logs',
            columns: [
                {
                    name: 'log_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
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
        await queryRunner.dropTable('tbl_developer_logs');
    }

}

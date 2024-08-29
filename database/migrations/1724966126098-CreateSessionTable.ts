import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_session';
const IDX_SESSION: TableIndex = new TableIndex({ name: 'idx_session', columnNames: ['session_session'], isUnique: true });

export class CreateSessionTable1724966126098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'session_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'session_token',
                        type: 'varchar',
                        length: '1024',
                        isNullable: false
                    },
                    {
                        name: 'session_refresh',
                        type: 'varchar',
                        length: '1024',
                        isNullable: false
                    },
                    {
                        name: 'session_session',
                        type: 'varchar',
                        length: '64',
                    }
                ],
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, IDX_SESSION);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, IDX_SESSION);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

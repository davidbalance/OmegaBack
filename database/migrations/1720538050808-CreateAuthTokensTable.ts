import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_auth_tokens';

const INDEX_TOKEN_KEY: TableIndex = new TableIndex({ name: 'idx_token_key', columnNames: ['token_key'], isUnique: true });

export class CreateAuthTokensTable1720538050808 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'token_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'token_key',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'token_used',
                        type: 'varchar',
                        length: '256',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'token_expires_at',
                        type: 'datetime',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_TOKEN_KEY);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_TOKEN_KEY);
        
        await queryRunner.dropTable(TABLE_NAME);
    }

}

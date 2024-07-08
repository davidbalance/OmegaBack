import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTokenTable1720471584266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_auth_tokens',
            columns: [
                {
                    name: 'token_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'token_key',
                    type: 'int',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'token_used',
                    type: 'varchar',
                    length: '256',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'token_expires_at',
                    type: 'datetime',
                    isNullable: false,
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        await queryRunner.createIndex('tbl_auth_tokens', new TableIndex({
            name: 'token_key_idx',
            columnNames: ['token_key'],
            isUnique: true,
        }));

        await queryRunner.createIndex('tbl_auth_tokens', new TableIndex({
            name: 'token_used_idx',
            columnNames: ['token_used'],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_auth_tokens', 'token_key_idx');
        await queryRunner.dropIndex('tbl_auth_tokens', 'token_used_idx');
        await queryRunner.dropTable('tbl_auth_tokens');
    }

}

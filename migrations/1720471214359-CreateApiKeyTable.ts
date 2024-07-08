import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateApiKeyTable1720471214359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_auth_api_keys',
            columns: [
                {
                    name: 'api_key_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'api_key_value',
                    type: 'varchar',
                    length: '256',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'api_key_name',
                    type: 'varchar',
                    length: '256',
                },
                {
                    name: 'api_key_expires_at',
                    type: 'datetime',
                    isNullable: false,
                },
                {
                    name: 'api_key_status',
                    type: 'boolean',
                    default: true,
                    isNullable: false,
                },
                {
                    name: 'credential_id',
                    type: 'int',
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

        // Add foreign key constraint
        await queryRunner.createForeignKey('tbl_auth_api_keys', new TableForeignKey({
            columnNames: ['credential_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_user_credentials', // Replace with your actual table name
            onDelete: 'CASCADE',
        }));

        // Add unique index on api_key_value
        await queryRunner.createIndex('tbl_auth_api_keys', new TableIndex({
            name: 'api_key_value_idx',
            columnNames: ['api_key_value'],
            isUnique: true,
        }));

        // Add unique index on credential_id and api_key_name
        await queryRunner.createIndex('tbl_auth_api_keys', new TableIndex({
            name: 'api_key_id_name_idx',
            columnNames: ['credential_id', 'api_key_name'],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_auth_api_keys', 'FK_tbl_auth_api_keys_credential_id');
        await queryRunner.dropIndex('tbl_auth_api_keys', 'api_key_value_idx');
        await queryRunner.dropIndex('tbl_auth_api_keys', 'api_key_id_name_idx');
        await queryRunner.dropTable('tbl_auth_api_keys');
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_auth_api_keys';

const INDEX_VALUE: TableIndex = new TableIndex({ name: 'idx_api_key_value', columnNames: ['api_key_value'], isUnique: true });
const INDEX_ID_NAME: TableIndex = new TableIndex({ name: 'idx_api_key_id_name', columnNames: ['credential_id', 'api_key_name'], isUnique: true });

const FK_CREDENTIAL_APIKEY: TableForeignKey = new TableForeignKey({
    name: 'fk_auth_api_keys_credentials',
    columnNames: ['credential_id'],
    referencedColumnNames: ['credential_id'],
    referencedTableName: 'tbl_auth_credentials'
});

export class CreateAuthApiKeysTable1720538038459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'api_key_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'api_key_value',
                        type: 'varchar',
                        length: '256',
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
                        type: 'tinyint',
                        default: 1,
                    },
                    {
                        name: 'credential_id',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_ID_NAME);
        await queryRunner.createIndex(TABLE_NAME, INDEX_VALUE);

        await queryRunner.createForeignKey(TABLE_NAME, FK_CREDENTIAL_APIKEY);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_CREDENTIAL_APIKEY);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_ID_NAME);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_VALUE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

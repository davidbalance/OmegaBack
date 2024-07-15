import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_ow_clients';
const INDEX_CLIENT_USER: TableIndex = new TableIndex({ name: 'idx_client_user', columnNames: ['user_id'], isUnique: true });

const FK_OW_LOGO_CLIENT: TableForeignKey = new TableForeignKey({
    name: 'fk_ow_logo_client',
    columnNames: ['logo_id'],
    referencedColumnNames: ['logo_id'],
    referencedTableName: 'tbl_ow_logos'
});

export class CreateWebClientsTable1720553963378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'client_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'user_id',
                        type: 'int',
                        isUnique: true
                    },
                    {
                        name: 'logo_id',
                        type: 'int',
                        isNullable: true
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_CLIENT_USER);

        await queryRunner.createForeignKey(TABLE_NAME, FK_OW_LOGO_CLIENT);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_OW_LOGO_CLIENT);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_CLIENT_USER);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

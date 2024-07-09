import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_corporative_groups';
const INDEX_CORPORATIVE_NAME: TableIndex = new TableIndex({ name: 'idx_corporative_name', columnNames: ['corporative_name'], isUnique: true });

const FK_EXTERNAL_CORPORATIVE: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_external_corporative',
    columnNames: ['external_key'],
    referencedColumnNames: ['corporative_external_key_id'],
    referencedTableName: 'tbl_lo_corporative_external_key'
});

export class CreateLocationCorporativeGroupsTable1720539625561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'corporative_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'corporative_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'corporative_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'external_key',
                        type: 'int'
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_CORPORATIVE_NAME);

        await queryRunner.createForeignKey(TABLE_NAME, FK_EXTERNAL_CORPORATIVE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_EXTERNAL_CORPORATIVE);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_CORPORATIVE_NAME);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCorporativeGroupExternalKeyTable1720474818620 implements MigrationInterface {

    private readonly TABLE_NAME: string = 'tbl_lo_corporative_external_key';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.TABLE_NAME,
            columns: [
                {
                    name: "corporative_external_key_id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
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
                    name: "create_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
                {
                    name: "update_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                },
            ],
        }), true);

        const externalKeySourceKeyIndex = new TableIndex({
            name: 'external_key_source_key_idx',
            columnNames: ['external_source', 'external_key'],
            isUnique: true
        });
        await queryRunner.createIndex(this.TABLE_NAME, externalKeySourceKeyIndex);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(this.TABLE_NAME, 'external_key_source_key_idx');
        await queryRunner.dropTable(this.TABLE_NAME);
    }

}

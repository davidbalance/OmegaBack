import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class CreateCorporativeGroupTable1720472906579 implements MigrationInterface {

    private readonly TABLE_NAME: string = 'tbl_lo_corporative_groups';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: this.TABLE_NAME,
            columns: [
                {
                    name: "corporative_id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
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

        const corporativeNameIndex = new TableIndex({
            name: 'corporative_name_idx',
            columnNames: ['corporative_name'],
            isUnique: true
        });
        await queryRunner.createIndex(this.TABLE_NAME, corporativeNameIndex);

        const externalKeyColumn = new TableColumn({
            name: 'external_key',
            type: 'int',
            isNullable: true,
        });
        await queryRunner.addColumn(this.TABLE_NAME, externalKeyColumn);

        const externalKeyForeignKey = new TableForeignKey({
            columnNames: ['external_key'],
            referencedColumnNames: ['corporative_external_key_id'],
            referencedTableName: 'tbl_lo_corporative_external_key',
            onDelete: 'CASCADE',
        });
        await queryRunner.createForeignKey('fk_corporative_group_external_key', externalKeyForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(this.TABLE_NAME, 'fk_corporative_group_external_key');
        await queryRunner.dropIndex(this.TABLE_NAME, 'corporative_name_idx');
        await queryRunner.dropTable(this.TABLE_NAME);
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_d_diseases';
const INDEX_UNIQUE_GROUP_NAME: string = 'idx_unq_group_name';

const FK_DISEASE_GROUPS_DISEASE: TableForeignKey = new TableForeignKey({
    name: 'fk_disease_group_disease',
    columnNames: ['disease_group_id'],
    referencedColumnNames: ['disease_group_id'],
    referencedTableName: 'tbl_d_disease_groups'
});

export class CreateDiseasesTable1720538439643 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'disease_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'disease_name',
                        type: 'varchar',
                        length: '128'
                    },
                    {
                        name: 'disease_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'disease_group_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: INDEX_UNIQUE_GROUP_NAME,
            columnNames: ['disease_group_id', 'disease_name'],
            isUnique: true
        }));

        await queryRunner.createForeignKey(TABLE_NAME, FK_DISEASE_GROUPS_DISEASE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(TABLE_NAME, FK_DISEASE_GROUPS_DISEASE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

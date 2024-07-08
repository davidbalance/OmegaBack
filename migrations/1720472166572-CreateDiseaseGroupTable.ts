import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class CreateDiseaseGroupTable1720472166572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_d_disease_groups',
            columns: [
                {
                    name: 'disease_group_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'disease_group_name',
                    type: 'varchar',
                    length: '128',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'disease_group_status',
                    type: 'boolean',
                    default: true,
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

        await queryRunner.createIndex('tbl_d_disease_groups', new TableIndex({
            name: 'disease_group_name_idx',
            columnNames: ['disease_group_name'],
            isUnique: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_d_disease_groups', 'disease_group_name_idx');
        await queryRunner.dropTable('tbl_d_disease_groups');
    }

}

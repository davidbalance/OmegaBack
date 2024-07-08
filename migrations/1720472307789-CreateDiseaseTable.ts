import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDiseaseTable1720472307789 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_d_diseases',
            columns: [
                {
                    name: 'disease_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'disease_name',
                    type: 'varchar',
                    length: '128',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'disease_status',
                    type: 'boolean',
                    default: true,
                    isNullable: false,
                },
                {
                    name: 'disease_group_id',
                    type: 'int',
                },
            ],
        }));

        await queryRunner.createForeignKey('tbl_d_diseases', new TableForeignKey({
            columnNames: ['disease_group_id'],
            referencedColumnNames: ['disease_group_id'],
            referencedTableName: 'tbl_d_disease_groups',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_d_diseases', 'FK_tbl_d_diseases_disease_group_id');
        await queryRunner.dropTable('tbl_d_diseases');
    }

}

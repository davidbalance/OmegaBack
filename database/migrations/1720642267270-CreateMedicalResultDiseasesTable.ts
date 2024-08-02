import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_m_result_diseases';

const FK_M_RESULT_DISEASE: TableForeignKey = new TableForeignKey({
    name: 'fk_m_result_disease',
    columnNames: ['result_id'],
    referencedColumnNames: ['result_id'],
    referencedTableName: 'tbl_m_results'
});

export class CreateMedicalResultDiseasesTable1720642267270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'medical_result_disease_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'disease_id',
                        type: 'int'
                    },
                    {
                        name: 'disease_name',
                        type: 'varchar',
                        length: '128'
                    },
                    {
                        name: 'disease_commentary',
                        type: 'varchar',
                        length: '512'
                    },
                    {
                        name: 'disease_group_id',
                        type: 'int'
                    },
                    {
                        name: 'disease_group_name',
                        type: 'varchar',
                        length: '128'
                    },
                    {
                        name: 'result_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_RESULT_DISEASE)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_RESULT_DISEASE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

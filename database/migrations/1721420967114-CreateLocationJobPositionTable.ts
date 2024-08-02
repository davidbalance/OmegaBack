import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_job_position';
const INDEX_JOB_POSITON_NAME: TableIndex = new TableIndex({ name: 'idx_job_position_name', columnNames: ['job_position_name'], isUnique: true });

export class CreateLocationJobPositionTable1721420967114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'job_position_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'job_position_name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'job_position_status',
                        type: 'boolean',
                        default: true
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_JOB_POSITON_NAME);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_JOB_POSITON_NAME);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

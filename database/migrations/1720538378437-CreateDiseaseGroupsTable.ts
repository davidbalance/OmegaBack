import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME: string = 'tbl_d_disease_groups';

export class CreateDiseaseGroupsTable1720538378437 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'disease_group_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'disease_group_name',
                        type: 'varchar',
                        isUnique: true,
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'disease_group_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    }
                ]
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(TABLE_NAME);
    }

}

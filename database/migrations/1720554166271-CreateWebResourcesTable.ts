import { MigrationInterface, QueryRunner, Table } from "typeorm";

const TABLE_NAME: string = 'tbl_ow_resources';

export class CreateWebResourcesTable1720554166271 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'resource_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'resource_name',
                        type: 'varchar',
                        length: '128',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'resource_label',
                        type: 'varchar',
                        length: '128',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'resource_address',
                        type: 'varchar',
                        length: '256',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'resource_icon',
                        type: 'varchar',
                        length: '64',
                        isNullable: true
                    },
                    {
                        name: 'resource_show',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'resource_status',
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

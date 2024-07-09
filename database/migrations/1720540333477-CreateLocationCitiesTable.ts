import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_cities';

const INDEX_CITY_NAME: TableIndex = new TableIndex({ name: 'idx_city_name', columnNames: ['city_name'], isUnique: true });

export class CreateLocationCitiesTable1720540333477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'city_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'city_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false,
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_CITY_NAME);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_CITY_NAME);
        
        await queryRunner.dropTable(TABLE_NAME);
    }

}

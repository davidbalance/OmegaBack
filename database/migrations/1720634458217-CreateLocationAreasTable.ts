import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_areas';

const FK_M_MANAGEMENT_AREA: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_managements_areas',
    columnNames: ['management_id'],
    referencedColumnNames: ['management_id'],
    referencedTableName: 'tbl_lo_managements'
});

export class CreateLocationAreasTable1720634458217 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'area_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'area_name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'management_id',
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_MANAGEMENT_AREA)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_M_MANAGEMENT_AREA);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_branches';

const FK_LO_COMPANY_BRANCH: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_company_branch',
    columnNames: ['company_id'],
    referencedColumnNames: ['company_id'],
    referencedTableName: 'tbl_lo_companies'
});

const FK_LO_CITY_BRANCH: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_city_branch',
    columnNames: ['city_id'],
    referencedColumnNames: ['city_id'],
    referencedTableName: 'tbl_lo_cities'
});

const FK_LO_EXTERNAL_BRANCH: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_external_branch',
    columnNames: ['external_key'],
    referencedColumnNames: ['branch_external_key_id'],
    referencedTableName: 'tbl_lo_branch_external_key'
});

export class CreateLocationBranchesTable1720540471283 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'branch_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'branch_name',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'branch_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'company_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'city_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'external_key',
                        type: 'int',
                        isNullable: true
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_LO_COMPANY_BRANCH);
        await queryRunner.createForeignKey(TABLE_NAME, FK_LO_CITY_BRANCH);
        await queryRunner.createForeignKey(TABLE_NAME, FK_LO_EXTERNAL_BRANCH);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LO_COMPANY_BRANCH);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LO_CITY_BRANCH);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LO_EXTERNAL_BRANCH);

        await queryRunner.dropTable(TABLE_NAME);
    }

}

import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class CreateMedicalClientTable1720468640122 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_client',
            columns: [
                {
                    name: 'medical_client_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'medical_client_dni',
                    type: 'varchar',
                    length: '10',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'medical_client_fullname',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'medical_client_birthday',
                    type: 'date',
                    isNullable: false
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true);

        await queryRunner.createIndex('tbl_m_client', new TableIndex({
            name: 'medical_dni_idx',
            columnNames: ['medical_client_dni'],
            isUnique: true
        }));

        await queryRunner.addColumn('tbl_m_client', new TableColumn({
            name: 'medical_order_id',
            type: 'int',
            isNullable: true
        }));

        await queryRunner.createForeignKey('tbl_m_client', new TableForeignKey({
            columnNames: ['medical_order_id'],
            referencedColumnNames: ['medical_order_id'],
            referencedTableName: 'tbl_medical_orders',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('tbl_medical_emails', new TableForeignKey({
            columnNames: ['client_id'],
            referencedColumnNames: ['medical_client_id'],
            referencedTableName: 'tbl_m_client',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_medical_emails', 'FK_tbl_medical_emails_client_id');
        await queryRunner.dropForeignKey('tbl_m_client', 'FK_tbl_m_client_medical_order_id');
        await queryRunner.dropColumn('tbl_m_client', 'medical_order_id');
        await queryRunner.dropIndex('tbl_m_client', 'medical_dni_idx');
        await queryRunner.dropTable('tbl_m_client');
    }

}

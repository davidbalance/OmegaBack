import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateDoctorTable1720468379765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_u_doctors',
            columns: [
                {
                    name: 'doctor_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'doctor_signature',
                    type: 'varchar',
                    length: '256',
                    isNullable: true
                },
                {
                    name: 'user_id',
                    type: 'int'
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

        await queryRunner.createForeignKey('tbl_u_doctors', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'tbl_u_users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_u_doctors', 'FK_tbl_u_doctors_user_id');
        await queryRunner.dropTable('tbl_u_doctors');
    }

}

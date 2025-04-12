import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveDoctorSignatureAddHasFileField1721220832924 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tbl_u_doctors', 'doctor_signature')
        await queryRunner.addColumn('tbl_u_doctors', new TableColumn({
            name: 'doctor_has_file',
            type: 'boolean',
            default: false,
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tbl_u_doctors', 'doctor_has_file')
        await queryRunner.addColumn('tbl_u_doctors', new TableColumn({
            name: 'doctor_signature',
            type: 'varchar',
            length: '256',
            isNullable: true
        }));
    }

}

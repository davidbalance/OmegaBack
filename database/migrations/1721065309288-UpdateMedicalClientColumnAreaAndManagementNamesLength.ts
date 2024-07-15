import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMedicalClientColumnAreaAndManagementNamesLength1721065309288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tbl_m_client` MODIFY `location_area_name` varchar(128)");
        await queryRunner.query("ALTER TABLE `tbl_m_client` MODIFY `location_management_name` varchar(128)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tbl_m_client` MODIFY `location_area_name` varchar(25)");
        await queryRunner.query("ALTER TABLE `tbl_m_client` MODIFY `location_management_name` varchar(25)");
    }

}

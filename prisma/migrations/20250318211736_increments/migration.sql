-- AlterTable
ALTER TABLE `logger` ALTER COLUMN `logger_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_a_apikeys` ALTER COLUMN `apikey_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_a_auths` ALTER COLUMN `auth_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_a_logos` ALTER COLUMN `logo_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_a_resources` ALTER COLUMN `resource_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_a_tokens` ALTER COLUMN `token_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_d_disease_groups` ALTER COLUMN `disease_group_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_d_diseases` ALTER COLUMN `disease_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lab_exam_subtypes` ALTER COLUMN `exam_subtype_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lab_exam_types` ALTER COLUMN `exam_type_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lab_exams` ALTER COLUMN `exam_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_areas` ALTER COLUMN `area_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_branches` ALTER COLUMN `branch_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_companies` ALTER COLUMN `company_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_corporative_groups` ALTER COLUMN `corporative_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_job_positions` ALTER COLUMN `job_position_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_lo_managements` ALTER COLUMN `management_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_clients` ALTER COLUMN `medical_client_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_disease_reports` ALTER COLUMN `medical_disease_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_emails` ALTER COLUMN `medical_email_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_orders` ALTER COLUMN `medical_order_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_reports` ALTER COLUMN `medical_report_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_results` ALTER COLUMN `medical_result_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_m_tests` ALTER COLUMN `medical_test_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_u_attributes` ALTER COLUMN `user_attribute_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_u_doctors` ALTER COLUMN `doctor_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_u_patients` ALTER COLUMN `patient_id` DROP DEFAULT;

-- AlterTable
ALTER TABLE `tbl_u_users` ALTER COLUMN `user_id` DROP DEFAULT;

-- CreateTable
CREATE TABLE `tbl_increments` (
    `increment_id` CHAR(36) NOT NULL,
    `increment_key` VARCHAR(32) NOT NULL,
    `increment_count` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_increments_increment_key_key`(`increment_key`),
    PRIMARY KEY (`increment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

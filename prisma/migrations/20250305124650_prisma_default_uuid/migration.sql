-- AlterTable
ALTER TABLE `logger` MODIFY COLUMN `logger_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_a_apikeys` MODIFY COLUMN `apikey_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_a_auths` MODIFY COLUMN `auth_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_a_logos` MODIFY COLUMN `logo_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_a_resources` MODIFY COLUMN `resource_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_a_tokens` MODIFY COLUMN `token_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_d_disease_groups` MODIFY COLUMN `disease_group_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_d_diseases` MODIFY COLUMN `disease_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lab_exam_subtypes` MODIFY COLUMN `exam_subtype_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lab_exam_types` MODIFY COLUMN `exam_type_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lab_exams` MODIFY COLUMN `exam_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_areas` MODIFY COLUMN `area_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_branches` MODIFY COLUMN `branch_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_companies` MODIFY COLUMN `company_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_corporative_groups` MODIFY COLUMN `corporative_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_job_positions` MODIFY COLUMN `job_position_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_lo_managements` MODIFY COLUMN `management_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_clients` MODIFY COLUMN `medical_client_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_disease_reports` MODIFY COLUMN `medical_disease_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_emails` MODIFY COLUMN `medical_email_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_orders` MODIFY COLUMN `medical_order_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_reports` MODIFY COLUMN `medical_report_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_results` MODIFY COLUMN `medical_result_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_m_tests` MODIFY COLUMN `medical_test_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_u_attributes` MODIFY COLUMN `user_attribute_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_u_doctors` MODIFY COLUMN `doctor_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_u_patients` MODIFY COLUMN `patient_id` CHAR(36) DEFAULT (UUID());

-- AlterTable
ALTER TABLE `tbl_u_users` MODIFY COLUMN `user_id` CHAR(36) DEFAULT (UUID());
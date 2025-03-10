-- CreateTable
CREATE TABLE `logger` (
    `logger_id` CHAR(36) NOT NULL,
    `logger_level` VARCHAR(32) NOT NULL,
    `logger_message` TEXT NOT NULL,
    `logger_timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`logger_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_auths` (
    `auth_id` CHAR(36) NOT NULL,
    `auth_email` VARCHAR(128) NOT NULL,
    `auth_name` VARCHAR(128) NOT NULL,
    `auth_lastname` VARCHAR(128) NOT NULL,
    `auth_password` VARCHAR(256) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `logo_id` CHAR(36) NULL,

    UNIQUE INDEX `tbl_a_auths_auth_email_key`(`auth_email`),
    INDEX `idx_auth_email`(`auth_email`),
    PRIMARY KEY (`auth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_apikeys` (
    `apikey_id` CHAR(36) NOT NULL,
    `apikey_value` CHAR(36) NOT NULL,
    `apikey_name` VARCHAR(256) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `auth_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_apikey_auth_name`(`apikey_name`, `auth_id`),
    PRIMARY KEY (`apikey_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_tokens` (
    `token_id` CHAR(36) NOT NULL,
    `token_value` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `auth_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `tbl_a_tokens_auth_id_key`(`auth_id`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_resources` (
    `resource_id` CHAR(36) NOT NULL,
    `resource_label` VARCHAR(128) NOT NULL,
    `resource_address` VARCHAR(256) NOT NULL,
    `resource_icon` VARCHAR(64) NOT NULL,
    `resource_order` INTEGER NOT NULL DEFAULT 0,
    `resource_hidden` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_a_resources_resource_address_key`(`resource_address`),
    PRIMARY KEY (`resource_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_auth_resources` (
    `auth_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `resource_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_auth_respurce`(`auth_id`, `resource_id`),
    PRIMARY KEY (`auth_id`, `resource_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_a_logos` (
    `logo_id` CHAR(36) NOT NULL,
    `logo_name` VARCHAR(128) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_a_logos_logo_name_key`(`logo_name`),
    PRIMARY KEY (`logo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_clients` (
    `medical_client_id` CHAR(36) NOT NULL,
    `management_id` CHAR(36) NULL,
    `management_name` VARCHAR(128) NULL,
    `area_id` CHAR(36) NULL,
    `area_name` VARCHAR(128) NULL,
    `job_position_name` VARCHAR(128) NULL,
    `patient_dni` VARCHAR(16) NOT NULL,
    `patient_name` VARCHAR(128) NOT NULL,
    `patient_lastname` VARCHAR(128) NOT NULL,
    `patient_birthday` DATE NOT NULL,
    `patient_role` VARCHAR(128) NULL,
    `patient_gender` ENUM('female', 'male') NOT NULL DEFAULT 'male',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_m_clients_patient_dni_key`(`patient_dni`),
    INDEX `idx_m_client_dni`(`patient_dni`),
    PRIMARY KEY (`medical_client_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_emails` (
    `medical_email_id` CHAR(36) NOT NULL,
    `medical_email_value` VARCHAR(128) NOT NULL,
    `medical_email_default` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_client_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_m_email`(`medical_email_value`, `medical_client_id`),
    PRIMARY KEY (`medical_email_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_orders` (
    `medical_order_id` CHAR(36) NOT NULL,
    `doctor_dni` VARCHAR(10) NOT NULL,
    `doctor_fullname` VARCHAR(128) NOT NULL,
    `doctor_signature` VARCHAR(512) NOT NULL,
    `corporative_name` VARCHAR(64) NOT NULL,
    `company_ruc` VARCHAR(13) NOT NULL,
    `company_name` VARCHAR(64) NOT NULL,
    `branch_name` VARCHAR(128) NOT NULL,
    `medical_order_email_status` BOOLEAN NOT NULL DEFAULT false,
    `medical_order_process` VARCHAR(64) NOT NULL,
    `medical_order_year` INTEGER NOT NULL,
    `medical_order_status` ENUM('created', 'validated') NOT NULL DEFAULT 'created',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_client_id` CHAR(36) NOT NULL,

    INDEX `idx_m_order_doctorDni`(`doctor_dni`),
    INDEX `idx_m_order_companyRuc`(`company_ruc`),
    PRIMARY KEY (`medical_order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_tests` (
    `medical_test_id` CHAR(36) NOT NULL,
    `exam_name` VARCHAR(128) NOT NULL,
    `exam_subtype` VARCHAR(64) NOT NULL,
    `exam_type` VARCHAR(64) NOT NULL,
    `medical_test_checklist_status` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_order_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`medical_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_results` (
    `medical_result_id` CHAR(36) NOT NULL,
    `medical_result_filepath` VARCHAR(512) NULL,
    `medical_result_has_file` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_test_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `tbl_m_results_medical_test_id_key`(`medical_test_id`),
    PRIMARY KEY (`medical_result_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_reports` (
    `medical_report_id` CHAR(36) NOT NULL,
    `medical_report_content` LONGTEXT NULL,
    `medical_report_filepath` VARCHAR(512) NULL,
    `medical_report_create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_test_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `tbl_m_reports_medical_test_id_key`(`medical_test_id`),
    PRIMARY KEY (`medical_report_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_disease_reports` (
    `medical_disease_id` CHAR(36) NOT NULL,
    `disease_id` CHAR(36) NOT NULL,
    `disease_name` VARCHAR(128) NOT NULL,
    `disease_group_id` CHAR(36) NOT NULL,
    `disease_group_name` VARCHAR(128) NOT NULL,
    `medical_disease_commentary` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_test_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`medical_disease_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_d_disease_groups` (
    `disease_group_id` CHAR(36) NOT NULL,
    `disease_group_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`disease_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_d_diseases` (
    `disease_id` CHAR(36) NOT NULL,
    `disease_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `disease_group_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_d_disease_name`(`disease_name`, `disease_group_id`),
    PRIMARY KEY (`disease_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_types` (
    `exam_type_id` CHAR(36) NOT NULL,
    `exam_type_name` VARCHAR(64) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`exam_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_subtypes` (
    `exam_subtype_id` CHAR(36) NOT NULL,
    `exam_subtype_name` VARCHAR(64) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `exam_type_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_lab_examSubtype_name`(`exam_subtype_name`, `exam_type_id`),
    PRIMARY KEY (`exam_subtype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exams` (
    `exam_id` CHAR(36) NOT NULL,
    `exam_name` VARCHAR(256) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `exam_subtype_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_lab_exam_name`(`exam_name`, `exam_subtype_id`),
    PRIMARY KEY (`exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_corporative_groups` (
    `corporative_id` CHAR(36) NOT NULL,
    `corporative_name` VARCHAR(64) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`corporative_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_companies` (
    `company_id` CHAR(36) NOT NULL,
    `company_name` VARCHAR(64) NOT NULL,
    `company_ruc` VARCHAR(13) NOT NULL,
    `company_address` VARCHAR(128) NOT NULL,
    `company_phone` VARCHAR(16) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `corporative_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_lo_company_ruc`(`company_ruc`, `corporative_id`),
    PRIMARY KEY (`company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_branches` (
    `branch_id` CHAR(36) NOT NULL,
    `branch_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `city_id` INTEGER NOT NULL,
    `company_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`branch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_cities` (
    `city_id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_areas` (
    `area_id` CHAR(36) NOT NULL,
    `area_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`area_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_managements` (
    `management_id` CHAR(36) NOT NULL,
    `management_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`management_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_job_positions` (
    `job_position_id` CHAR(36) NOT NULL,
    `job_position_name` VARCHAR(128) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`job_position_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_u_users` (
    `user_id` CHAR(36) NOT NULL,
    `user_dni` VARCHAR(16) NOT NULL,
    `user_email` VARCHAR(128) NULL,
    `user_name` VARCHAR(128) NOT NULL,
    `user_lastname` VARCHAR(128) NOT NULL,
    `user_auth` CHAR(36) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `tbl_u_users_user_dni_key`(`user_dni`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_u_doctors` (
    `doctor_id` CHAR(36) NOT NULL,
    `doctor_signature` VARCHAR(512) NOT NULL,
    `doctor_has_file` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `tbl_u_doctors_user_id_key`(`user_id`),
    PRIMARY KEY (`doctor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_u_patients` (
    `patient_id` CHAR(36) NOT NULL,
    `patient_birthday` DATE NOT NULL,
    `patient_gender` ENUM('female', 'male') NOT NULL DEFAULT 'male',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `tbl_u_patients_user_id_key`(`user_id`),
    PRIMARY KEY (`patient_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_u_attributes` (
    `user_attribute_id` CHAR(36) NOT NULL,
    `user_attribute_name` VARCHAR(64) NOT NULL,
    `user_attribute_value` VARCHAR(512) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `user_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `unq_u_attribute_name`(`user_attribute_name`, `user_id`),
    PRIMARY KEY (`user_attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_a_auths` ADD CONSTRAINT `tbl_a_auths_logo_id_fkey` FOREIGN KEY (`logo_id`) REFERENCES `tbl_a_logos`(`logo_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_a_apikeys` ADD CONSTRAINT `tbl_a_apikeys_auth_id_fkey` FOREIGN KEY (`auth_id`) REFERENCES `tbl_a_auths`(`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_a_tokens` ADD CONSTRAINT `tbl_a_tokens_auth_id_fkey` FOREIGN KEY (`auth_id`) REFERENCES `tbl_a_auths`(`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_a_auth_resources` ADD CONSTRAINT `tbl_a_auth_resources_auth_id_fkey` FOREIGN KEY (`auth_id`) REFERENCES `tbl_a_auths`(`auth_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_a_auth_resources` ADD CONSTRAINT `tbl_a_auth_resources_resource_id_fkey` FOREIGN KEY (`resource_id`) REFERENCES `tbl_a_resources`(`resource_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_emails` ADD CONSTRAINT `tbl_m_emails_medical_client_id_fkey` FOREIGN KEY (`medical_client_id`) REFERENCES `tbl_m_clients`(`medical_client_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_orders` ADD CONSTRAINT `tbl_m_orders_medical_client_id_fkey` FOREIGN KEY (`medical_client_id`) REFERENCES `tbl_m_clients`(`medical_client_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_tests` ADD CONSTRAINT `tbl_m_tests_medical_order_id_fkey` FOREIGN KEY (`medical_order_id`) REFERENCES `tbl_m_orders`(`medical_order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_results` ADD CONSTRAINT `tbl_m_results_medical_test_id_fkey` FOREIGN KEY (`medical_test_id`) REFERENCES `tbl_m_tests`(`medical_test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_reports` ADD CONSTRAINT `tbl_m_reports_medical_test_id_fkey` FOREIGN KEY (`medical_test_id`) REFERENCES `tbl_m_tests`(`medical_test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_disease_reports` ADD CONSTRAINT `tbl_m_disease_reports_medical_test_id_fkey` FOREIGN KEY (`medical_test_id`) REFERENCES `tbl_m_tests`(`medical_test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_d_diseases` ADD CONSTRAINT `tbl_d_diseases_disease_group_id_fkey` FOREIGN KEY (`disease_group_id`) REFERENCES `tbl_d_disease_groups`(`disease_group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lab_exam_subtypes` ADD CONSTRAINT `tbl_lab_exam_subtypes_exam_type_id_fkey` FOREIGN KEY (`exam_type_id`) REFERENCES `tbl_lab_exam_types`(`exam_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lab_exams` ADD CONSTRAINT `tbl_lab_exams_exam_subtype_id_fkey` FOREIGN KEY (`exam_subtype_id`) REFERENCES `tbl_lab_exam_subtypes`(`exam_subtype_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_companies` ADD CONSTRAINT `tbl_lo_companies_corporative_id_fkey` FOREIGN KEY (`corporative_id`) REFERENCES `tbl_lo_corporative_groups`(`corporative_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_branches` ADD CONSTRAINT `tbl_lo_branches_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `tbl_lo_cities`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_branches` ADD CONSTRAINT `tbl_lo_branches_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `tbl_lo_companies`(`company_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_u_doctors` ADD CONSTRAINT `tbl_u_doctors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_u_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_u_patients` ADD CONSTRAINT `tbl_u_patients_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_u_users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_u_attributes` ADD CONSTRAINT `tbl_u_attributes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_u_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE `tbl_m_order_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `medical_order_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `medical_order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_test_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `medical_test_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `medical_test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_type_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `exam_type_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `exam_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_subtype_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `exam_subtype_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `exam_subtype_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `exam_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `exam_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_corporative_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `corporative_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `corporative_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_company_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `company_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `company_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_branch_external_keys` (
    `external_owner` CHAR(128) NOT NULL,
    `external_value` CHAR(128) NOT NULL,
    `branch_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`, `branch_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_m_order_external_keys` ADD CONSTRAINT `tbl_m_order_external_keys_medical_order_id_fkey` FOREIGN KEY (`medical_order_id`) REFERENCES `tbl_m_orders`(`medical_order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_m_test_external_keys` ADD CONSTRAINT `tbl_m_test_external_keys_medical_test_id_fkey` FOREIGN KEY (`medical_test_id`) REFERENCES `tbl_m_tests`(`medical_test_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lab_exam_type_external_keys` ADD CONSTRAINT `tbl_lab_exam_type_external_keys_exam_type_id_fkey` FOREIGN KEY (`exam_type_id`) REFERENCES `tbl_lab_exam_types`(`exam_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lab_exam_subtype_external_keys` ADD CONSTRAINT `tbl_lab_exam_subtype_external_keys_exam_subtype_id_fkey` FOREIGN KEY (`exam_subtype_id`) REFERENCES `tbl_lab_exam_subtypes`(`exam_subtype_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lab_exam_external_keys` ADD CONSTRAINT `tbl_lab_exam_external_keys_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `tbl_lab_exams`(`exam_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_corporative_external_keys` ADD CONSTRAINT `tbl_lo_corporative_external_keys_corporative_id_fkey` FOREIGN KEY (`corporative_id`) REFERENCES `tbl_lo_corporative_groups`(`corporative_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_company_external_keys` ADD CONSTRAINT `tbl_lo_company_external_keys_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `tbl_lo_companies`(`company_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_lo_branch_external_keys` ADD CONSTRAINT `tbl_lo_branch_external_keys_branch_id_fkey` FOREIGN KEY (`branch_id`) REFERENCES `tbl_lo_branches`(`branch_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

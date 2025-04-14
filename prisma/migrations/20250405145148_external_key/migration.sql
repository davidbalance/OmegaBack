-- CreateTable
CREATE TABLE `tbl_m_order_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `medical_order_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_m_test_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `medical_test_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_type_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `exam_type_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_subtype_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `exam_subtype_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lab_exam_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `exam_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_corporative_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `corporative_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_company_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `company_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_lo_branch_external_keys` (
    `external_owner` VARCHAR(128) NOT NULL,
    `external_value` VARCHAR(128) NOT NULL,
    `branch_id` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`external_owner`, `external_value`)
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

-- CreateView
CREATE VIEW v_m_order_external_connection AS
SELECT tmoek.external_owner, tmoek.external_value, tmoek.medical_order_id AS order_id, tmc.patient_dni
FROM omega.tbl_m_order_external_keys tmoek
INNER JOIN omega.tbl_m_orders tmo ON tmo.medical_order_id = tmoek.medical_order_id
INNER JOIN omega.tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id;

-- CreateView
CREATE VIEW v_m_test_external_connection AS
SELECT tmtek.external_owner, tmtek.external_value, tmtek.medical_test_id AS test_id
FROM omega.tbl_m_test_external_keys tmtek
INNER JOIN omega.tbl_m_tests tmt ON tmt.medical_test_id = tmtek.medical_test_id;

-- CreateView
CREATE VIEW v_lab_exam_external_connection AS
SELECT tleek.external_owner, tleek.external_value, tleek.exam_id, tle.exam_subtype_id
FROM omega.tbl_lab_exam_external_keys tleek
INNER JOIN omega.tbl_lab_exams tle ON tle.exam_id = tleek.exam_id;

-- CreateView
CREATE VIEW v_lab_exam_subtype_external_connection AS
SELECT tlesek.external_owner, tlesek.external_value, tlesek.exam_subtype_id, tles.exam_type_id
FROM omega.tbl_lab_exam_subtype_external_keys tlesek
INNER JOIN omega.tbl_lab_exam_subtypes tles ON tles.exam_subtype_id = tlesek.exam_subtype_id;

-- CreateView
CREATE VIEW v_lab_exam_type_external_connection AS
SELECT tletek.external_owner, tletek.external_value, tletek.exam_type_id
FROM omega.tbl_lab_exam_type_external_keys tletek
INNER JOIN omega.tbl_lab_exam_types tlet ON tlet.exam_type_id = tletek.exam_type_id;

-- CreateView
CREATE VIEW v_lo_branch_external_connection AS
SELECT tlbek.external_owner, tlbek.external_value, tlbek.branch_id, tlb.company_id
FROM omega.tbl_lo_branch_external_keys tlbek
INNER JOIN omega.tbl_lo_branches tlb ON tlb.branch_id = tlbek.branch_id;

-- CreateView
CREATE VIEW v_lo_company_external_connection AS
SELECT tlcek.external_owner, tlcek.external_value, tlcek.company_id, tlc.corporative_id
FROM omega.tbl_lo_company_external_keys tlcek
INNER JOIN omega.tbl_lo_companies tlc ON tlc.company_id = tlcek.company_id;

-- CreateView
CREATE VIEW v_lo_corporative_external_connection AS
SELECT tlcek.external_owner, tlcek.external_value, tlc.corporative_id
FROM omega.tbl_lo_corporative_external_keys tlcek
INNER JOIN omega.tbl_lo_corporative_groups tlc ON tlc.corporative_id = tlcek.corporative_id;
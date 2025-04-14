-- CreateTable
CREATE TABLE `tbl_m_records` (
    `medical_record_id` CHAR(36) NOT NULL,
    `medical_record_filepath` TEXT NOT NULL,
    `medical_record_name` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `medical_client_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`medical_record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_m_records` ADD CONSTRAINT `tbl_m_records_medical_client_id_fkey` FOREIGN KEY (`medical_client_id`) REFERENCES `tbl_m_clients`(`medical_client_id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- CreateView
CREATE VIEW v_m_client_records AS
SELECT tmr.medical_record_id, tmr.medical_record_filepath, tmr.medical_record_name, tmr.created_at AS medical_record_create_at, tmc.patient_dni
FROM tbl_m_records tmr
INNER JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmr.medical_client_id;
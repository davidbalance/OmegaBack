-- AlterTable
ALTER TABLE `tbl_m_records` ADD COLUMN `medical_record_metadata` JSON NULL,
    ADD COLUMN `medical_record_status` ENUM('completed', 'started') NOT NULL DEFAULT 'completed',
    ADD COLUMN `medical_record_version` ENUM('v1', 'v2') NOT NULL DEFAULT 'v1';

-- CreateView
DROP VIEW v_m_client_records;

CREATE VIEW v_m_client_records AS
SELECT tmr.medical_record_id, tmr.medical_record_filepath, tmr.medical_record_metadata, tmr.medical_record_name, tmr.created_at AS medical_record_create_at, tmc.patient_dni, tmr.medical_record_version as "version", tmr.medical_record_status as "status"
FROM tbl_m_records tmr
INNER JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmr.medical_client_id;
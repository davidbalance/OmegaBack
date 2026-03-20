-- This is an empty migration.
DROP VIEW v_m_order_cloud_file_items;

CREATE VIEW v_m_order_cloud_file_items AS
SELECT 
	tmt.medical_test_id AS test_id, 
	tmc.patient_dni, 
	CONCAT(tmc.patient_name, ' ', tmc.patient_lastname) AS patient_fullname,
	tmo.medical_order_id AS order_id, 
	tmt.exam_name, 
	IF(tmr.medical_result_has_file IS NOT NULL AND tmr.medical_result_has_file = 1, 1, 0) AS result_has_file, 
	IF(tmr2.medical_report_content IS NOT NULL OR tmr2.medical_report_filepath IS NOT NULL, 1, 0) AS report_has_content
FROM tbl_m_tests tmt
LEFT JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
LEFT JOIN tbl_m_reports tmr2 ON tmr2.medical_test_id = tmt.medical_test_id
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1
ORDER BY tmt.exam_name ASC;
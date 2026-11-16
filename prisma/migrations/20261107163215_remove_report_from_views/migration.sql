DROP VIEW v_m_tests;
CREATE VIEW v_m_tests AS
SELECT 
	tmt.medical_test_id,
	tmt.medical_test_checklist_status AS test_checklist, 
	IF (tmr.medical_result_has_file IS NOT NULL AND tmr.medical_result_has_file = 1, 1, 0) AS result_has_file, 
	tmt.medical_order_id, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type, 
	GROUP_CONCAT(CONCAT(tmdr.disease_name, ', ', LEFT(tmdr.medical_disease_commentary, 12), '...' ) SEPARATOR '|') medical_test_diseases
FROM tbl_m_tests tmt
JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
LEFT JOIN tbl_m_disease_reports tmdr ON tmdr.medical_test_id = tmt.medical_test_id
WHERE tmt.is_active = 1
GROUP BY tmt.medical_test_id,
	tmt.medical_test_checklist_status,
	tmr.medical_result_has_file,
	tmt.medical_order_id, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type
ORDER BY tmt.exam_name ASC;

DROP VIEW v_m_order_cloud_file_items;
CREATE VIEW v_m_order_cloud_file_items AS
SELECT 
	tmt.medical_test_id AS test_id, 
	tmc.patient_dni, 
	CONCAT(tmc.patient_name, ' ', tmc.patient_lastname) AS patient_fullname,
	tmo.medical_order_id AS order_id, 
	tmt.exam_name, 
	IF(tmr.medical_result_has_file IS NOT NULL AND tmr.medical_result_has_file = 1, 1, 0) AS result_has_file
FROM tbl_m_tests tmt
LEFT JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1
ORDER BY tmt.exam_name ASC;

DROP VIEW v_m_order_doctors;
CREATE VIEW v_m_order_doctors AS
SELECT 
	tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status AS medical_order_email, 
	tmo.medical_order_status, 
	tmo.created_at AS medical_order_emission_date, 
	tmo.doctor_dni, 
	tmc.patient_dni
FROM tbl_m_orders tmo
JOIN tbl_m_tests tmt ON tmt.medical_order_id = tmo.medical_order_id AND tmt.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1
GROUP BY tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status, 
	tmo.medical_order_status, 
	tmo.doctor_dni, 
	tmc.patient_dni;
DROP VIEW v_m_order_checklist_items;
CREATE VIEW v_m_order_checklist_items AS
SELECT 
	tmt.medical_test_id AS test_id,
	tmt.medical_test_checklist_status AS test_checklist, 
	tmt.exam_name, 
	tmc.patient_dni, 
	tmc.patient_name, 
	tmc.patient_lastname, 
	tmo.medical_order_id AS order_id, 
	tmo.medical_order_process, 
	tmo.created_at AS medical_order_emission_date, 
	tmo.company_ruc AS location_company_ruc, 
	tmo.company_name AS location_company_name, 
	tmc.job_position_name AS location_job_position_name
FROM tbl_m_tests tmt 
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmt.is_active = 1;

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
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmt.is_active = 1;

DROP VIEW v_m_order_doctors;
CREATE VIEW v_m_order_doctors AS
SELECT 
	tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status AS medical_order_email, 
	tmo.medical_order_status, 
	SUM(IF(tmr.medical_report_content IS NULL AND tmr.medical_report_filepath IS NULL, 1, 0)) AS medical_order_left_reports,  
	tmo.created_at AS medical_order_emission_date, 
	tmo.doctor_dni, 
	tmc.patient_dni
FROM tbl_m_orders tmo
JOIN tbl_m_tests tmt ON tmt.medical_order_id = tmo.medical_order_id AND tmt.is_active = 1
JOIN tbl_m_reports tmr ON tmr.medical_test_id = tmt.medical_test_id 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1
GROUP BY tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status, 
	tmo.medical_order_status, 
	tmo.doctor_dni, 
	tmc.patient_dni;

DROP VIEW v_m_reports;
CREATE VIEW v_m_reports AS
SELECT 
	tmt.medical_test_id, 
	tmr.medical_report_content, 
	tmr.medical_report_filepath,
	tmr.medical_report_create_at AS medical_report_create_at, 
	CONCAT(tmc.patient_name, ' ', tmc.patient_lastname) AS patient_fullname, 
	DATE_FORMAT(FROM_DAYS(DATEDIFF(CURRENT_DATE(), tmc.patient_birthday)), '%Y')+0 AS patient_age, 
	tmc.patient_dni,
	tmo.corporative_name AS location_company_name, 
	tmt.exam_name, 
	tmo.doctor_dni, 
	tmo.doctor_fullname, 
	tmo.doctor_signature
FROM tbl_m_reports tmr
JOIN tbl_m_tests tmt ON tmt.medical_test_id = tmr.medical_test_id AND tmt.is_active = 1
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id;

DROP VIEW v_m_result_filepaths;
CREATE VIEW v_m_result_filepaths AS
SELECT 
	tmt.medical_test_id, 
	tmo.medical_order_year, 
	tmo.corporative_name AS location_corporative, 
	CONCAT(tmo.company_ruc, '_', tmo.company_name) AS location_company,
	tmo.branch_name AS location_branch, 
	CONCAT(tmc.patient_dni, '_', tmc.patient_name, '_', tmc.patient_lastname) AS patient, 
	tmo.medical_order_id AS medical_order, 
	tmt.exam_name AS exam
FROM tbl_m_tests tmt
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmt.is_active = 1;

DROP VIEW v_m_test_reports;
CREATE VIEW v_m_test_reports AS
SELECT 
	tmdr.medical_disease_id,
	tmt.medical_test_id, 
	tmo.medical_order_year, 
	tmo.medical_order_process, 
	tmo.created_at AS medical_order_emission_date,
	tmo.corporative_name AS location_corporative, 
	tmo.company_name AS location_company, 
	tmo.branch_name AS location_branch_name, 
	IF (tmc.management_name IS NOT NULL, tmc.management_name , '') AS location_management, 
	IF (tmc.area_name IS NOT NULL, tmc.area_name , '') AS location_area, 
	IF (tmc.job_position_name IS NOT NULL, tmc.job_position_name , '') AS location_job_position, 
	tmc.patient_dni, 
	tmc.patient_name, 
	tmc.patient_lastname, 
	tme.medical_email_value AS patient_email, 
	tmc.patient_birthday, 
	tmc.patient_age,
	IF (tmc.patient_age < 50, 'de 18 a 49', IF(50 <= tmc.patient_age AND tmc.patient_age <= 64, 'de 50 a 64', 'mayor a 64' )) AS patient_age_range, 
	tmc.patient_role, 
	tmc.patient_gender, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type, 
	tmdr.disease_name, 
	tmdr.disease_group_name AS disease_group, 
	tmdr.medical_disease_commentary AS medical_disease_commentary, 
	IF (tmt.exam_type = 'LABORATORIO CLINICO', 'SALUD GENERAL', '') AS medical_disease_findings
FROM tbl_m_disease_reports tmdr 
JOIN tbl_m_tests tmt ON tmt.medical_test_id = tmdr.medical_test_id AND tmt.is_active = 1
INNER JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN (
	SELECT 
		medical_client_id, 
		management_name, 
		area_name, 
		job_position_name, 
		patient_dni, 
		patient_name, 
		patient_lastname, 
		patient_birthday, 
		patient_role, 
		patient_gender, 
		DATE_FORMAT(FROM_DAYS(DATEDIFF(CURRENT_DATE(), patient_birthday)), '%Y')+0 AS patient_age
	FROM tbl_m_clients
) tmc ON tmc.medical_client_id = tmo.medical_client_id
JOIN tbl_m_emails tme ON tme.medical_client_id = tmc.medical_client_id AND tme.medical_email_default = 1;

DROP VIEW v_m_tests;
CREATE VIEW v_m_tests AS
SELECT 
	tmt.medical_test_id,
	tmt.medical_test_checklist_status AS test_checklist, 
	IF (tmr.medical_result_has_file IS NOT NULL AND tmr.medical_result_has_file = 1, 1, 0) AS result_has_file, 
	IF (tmr2.medical_report_content IS NOT NULL OR tmr2.medical_report_filepath IS NOT NULL, 1, 0) AS report_has_file, 
	tmt.medical_order_id, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type, 
	GROUP_CONCAT(CONCAT(tmdr.disease_name, ', ', LEFT(tmdr.medical_disease_commentary, 12), '...' ) SEPARATOR '|') medical_test_diseases
FROM tbl_m_tests tmt
JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
JOIN tbl_m_reports tmr2 ON tmr2.medical_test_id = tmt.medical_test_id
LEFT JOIN tbl_m_disease_reports tmdr ON tmdr.medical_test_id = tmt.medical_test_id
WHERE tmt.is_active = 1
GROUP BY tmt.medical_test_id,
	tmt.medical_test_checklist_status,
	tmr.medical_result_has_file,
	tmr2.medical_report_content,
	tmt.medical_order_id, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type;

DROP VIEW v_m_test_file_result;
CREATE VIEW v_m_test_file_result AS
SELECT 
	tmt.medical_test_id AS medical_test_id,
	tmc.patient_name AS patient_name,
	tmc.patient_lastname AS patient_lastname,
	tmc.patient_dni AS patient_dni,
	tmt.exam_name AS exam_name,
	tmr.medical_result_filepath AS result_filepath,
	tmr.medical_result_has_file AS result_has_file
FROM tbl_m_tests tmt
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id AND tmo.is_active = 1
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id 
JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
LEFT JOIN tbl_m_disease_reports tmdr ON tmdr.medical_test_id = tmt.medical_test_id
WHERE tmt.is_active = 1
GROUP BY tmt.medical_test_id,
	tmc.patient_name,
	tmc.patient_lastname,
	tmc.patient_dni,
	tmt.exam_name,
	tmr.medical_result_filepath,
	tmr.medical_result_has_file;

CREATE VIEW v_m_tests_inner AS
SELECT 
	tmt.medical_test_id,
	tmt.medical_order_id,
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type,
	tmt.is_active
FROM tbl_m_tests tmt;
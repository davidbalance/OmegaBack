-- ---------------------------------------------Logger
-- Create View
CREATE VIEW v_logger_levels AS
SELECT DISTINCT logger_level
FROM logger;

-- ---------------------------------------------Auth
-- Create View
CREATE VIEW v_a_apikey_values AS
SELECT auth_id, apikey_name, apikey_value
FROM tbl_a_apikeys;

-- Create View
CREATE VIEW v_a_apikeys AS
SELECT auth_id, apikey_id, apikey_name
FROM tbl_a_apikeys;

-- Create View
CREATE VIEW v_a_auth_resources AS
SELECT taar.auth_id, tar.resource_id, tar.resource_label, tar.resource_address, tar.resource_order, tar.resource_icon
FROM tbl_a_resources tar
INNER JOIN tbl_a_auth_resources taar ON taar.resource_id = tar.resource_id;

-- Create View
CREATE VIEW v_a_auths AS
SELECT auth_id, auth_email, auth_name, auth_lastname, logo_name
FROM tbl_a_auths taa
LEFT JOIN tbl_a_logos tal ON tal.logo_id = taa.logo_id;

-- Create View
CREATE VIEW v_a_tokens AS
SELECT auth_id, token_value
FROM tbl_a_tokens;

-- Create View
CREATE VIEW v_a_logos AS
SELECT logo_id, logo_name
FROM tbl_a_logos;

-- Create View
CREATE VIEW v_a_resources AS
SELECT resource_id, resource_label, resource_address, resource_order, resource_icon
FROM tbl_a_resources
WHERE resource_hidden = 0;

-- ---------------------------------------------Medical
-- Create View
CREATE VIEW v_m_client_areas AS
SELECT patient_dni, area_id, area_name
FROM tbl_m_clients;

-- Create View
CREATE VIEW v_m_clients AS
SELECT DISTINCT tmc.medical_client_id, tmc.patient_dni, tmc.patient_name, tmc.patient_lastname, tmc.patient_birthday, tmc.patient_gender, tmc.patient_role, tmo.company_ruc
FROM tbl_m_clients tmc 
LEFT JOIN tbl_m_orders tmo ON tmo.medical_client_id = tmc.medical_client_id
WHERE tmc.is_active = 1;

-- Create View
CREATE VIEW v_m_client_doctors AS
SELECT DISTINCT tmc.medical_client_id, tmc.patient_dni, tmc.patient_name, tmc.patient_lastname, tmc.patient_birthday, tmc.patient_gender, tmc.patient_role, tmo.doctor_dni, tmo.company_ruc
FROM tbl_m_clients tmc 
LEFT JOIN tbl_m_orders tmo ON tmo.medical_client_id = tmc.medical_client_id
WHERE tmc.is_active = 1;

-- Create View
CREATE VIEW v_m_client_emails AS
SELECT tme.medical_email_id, tme.medical_email_value, tme.medical_email_default, tmc.patient_dni
FROM tbl_m_emails tme 
INNER JOIN tbl_m_clients tmc ON tmc.medical_client_id = tme.medical_client_id;

-- Create View
CREATE VIEW v_m_client_job_positions AS
SELECT patient_dni, job_position_name
FROM tbl_m_clients;

-- Create View
CREATE VIEW v_m_client_managements AS
SELECT patient_dni, management_id, management_name
FROM tbl_m_clients;

-- Create View
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
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1;

-- Create View
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
WHERE tmo.is_active = 1;

-- Create View
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
JOIN tbl_m_tests tmt ON tmt.medical_order_id = tmo.medical_order_id 
JOIN tbl_m_reports tmr ON tmr.medical_test_id = tmt.medical_test_id 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1
GROUP BY tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status, 
	tmo.medical_order_status, 
	tmo.doctor_dni, 
	tmc.patient_dni;

-- Create View
CREATE VIEW v_m_order_patients AS
SELECT tmo.medical_order_id, 
	tmo.medical_order_process,
	tmo.medical_order_email_status AS medical_order_email,
	tmo.created_at AS medical_order_emission_date, 
	tmo.medical_order_status, 
	tmc.patient_dni, 
	tmc.patient_name, 
	tmc.patient_lastname, 
	tmo.corporative_name AS location_corporative_name, 
	tmo.company_ruc AS location_company_ruc, 
	tmo.company_name AS location_company_name, 
	tmo.branch_name AS location_branch_name
FROM tbl_m_orders tmo
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1;

-- Create View
CREATE VIEW v_m_order_process AS
SELECT DISTINCT medical_order_process
FROM tbl_m_orders;

-- Create View
CREATE VIEW v_m_order_years AS
SELECT DISTINCT medical_order_year
FROM tbl_m_orders;

-- Create View
CREATE VIEW v_m_orders AS
SELECT tmo.medical_order_id,
	tmo.medical_order_email_status AS medical_order_email, 
	tmo.medical_order_process,
	tmo.created_at AS medical_order_emission_date, 
	tmo.medical_order_status, 
	tmc.patient_dni,
	tmo.medical_order_year 
FROM tbl_m_orders tmo 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id
WHERE tmo.is_active = 1;

-- Create View
CREATE VIEW v_m_disease_reports AS
SELECT medical_disease_id, medical_test_id, disease_id, disease_name, disease_group_id, disease_group_name, medical_disease_commentary
FROM tbl_m_disease_reports;

-- Create View
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
JOIN tbl_m_tests tmt ON tmt.medical_test_id = tmr.medical_test_id
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id;

-- Create View
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
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id;

-- Create View -> Is not necessary
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
JOIN tbl_m_tests tmt ON tmt.medical_test_id = tmdr.medical_test_id
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

-- Create View
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
GROUP BY tmt.medical_test_id,
	tmt.medical_test_checklist_status,
	tmr.medical_result_has_file,
	tmr2.medical_report_content,
	tmt.medical_order_id, 
	tmt.exam_name, 
	tmt.exam_subtype, 
	tmt.exam_type;

-- Create View
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
JOIN tbl_m_orders tmo ON tmo.medical_order_id = tmt.medical_order_id 
JOIN tbl_m_clients tmc ON tmc.medical_client_id = tmo.medical_client_id 
JOIN tbl_m_results tmr ON tmr.medical_test_id = tmt.medical_test_id
LEFT JOIN tbl_m_disease_reports tmdr ON tmdr.medical_test_id = tmt.medical_test_id
GROUP BY tmt.medical_test_id,
	tmc.patient_name,
	tmc.patient_lastname,
	tmc.patient_dni,
	tmt.exam_name,
	tmr.medical_result_filepath,
	tmr.medical_result_has_file;

-- ---------------------------------------------Disease
-- Create View
CREATE VIEW v_d_diseases AS
SELECT disease_id, disease_name, disease_group_id
FROM tbl_d_diseases;

-- Create View
CREATE VIEW v_d_disease_groups AS
SELECT 
	tddg.disease_group_id, 
	tddg.disease_group_name, 
	COUNT(tdd.disease_id) > 0 AS group_has_diseases
FROM tbl_d_disease_groups tddg
LEFT JOIN tbl_d_diseases tdd ON tdd.disease_group_id = tddg.disease_group_id
WHERE tddg.is_active = 1
GROUP BY tddg.disease_group_id, 
	tddg.disease_group_name;

-- Create View
CREATE VIEW v_d_disease_group_options AS
SELECT
	tddg.disease_group_id AS group_value,
	tddg.disease_group_name AS group_label, 
	tdd.disease_id AS disease_value, 
	tdd.disease_name AS disease_label
FROM tbl_d_disease_groups tddg
LEFT JOIN tbl_d_diseases tdd ON tdd.disease_group_id = tddg.disease_group_id
WHERE tddg.is_active = 1;

-- ---------------------------------------------Laboratory
-- Create View
CREATE VIEW v_lab_exams AS
SELECT exam_id, exam_name, exam_subtype_id
FROM tbl_lab_exams;

-- Create View
CREATE VIEW v_lab_exam_subtypes AS
SELECT 
	tles.exam_subtype_id, 
	tles.exam_subtype_name, 
	tles.exam_type_id,
	COUNT(tle.exam_id) > 0 AS subtype_has_exams 
FROM tbl_lab_exam_subtypes tles
LEFT JOIN tbl_lab_exams tle ON tle.exam_subtype_id = tles.exam_subtype_id
GROUP BY tles.exam_subtype_id, 
	tles.exam_subtype_name, 
	tles.exam_type_id;

-- Create View
CREATE VIEW v_lab_exam_types AS
SELECT 
	tlet.exam_type_id, 
	tlet.exam_type_name, 
	COUNT(tles.exam_subtype_id) > 0 AS test_has_subtypes 
FROM tbl_lab_exam_types tlet
JOIN tbl_lab_exam_subtypes tles ON tles.exam_type_id = tlet.exam_type_id
GROUP BY tlet.exam_type_id, 
	tlet.exam_type_name;

-- Create View
CREATE VIEW v_lab_exam_subtype_options AS
SELECT 
	tle.exam_id AS exam_value, 
	tle.exam_name AS exam_label, 
	tles.exam_subtype_id AS subtype_value, 
	tles.exam_subtype_name AS subtype_label
FROM tbl_lab_exam_subtypes tles
JOIN tbl_lab_exams tle ON tle.exam_subtype_id = tles.exam_subtype_id;

-- Create View
CREATE VIEW v_lab_exam_type_options AS
SELECT 
	tlet.exam_type_id AS type_value, 
	tlet.exam_type_name AS type_label, 
	tles.exam_subtype_id AS subtype_value, 
	tles.exam_subtype_name AS subtype_label
FROM tbl_lab_exam_types tlet
JOIN tbl_lab_exam_subtypes tles ON tles.exam_type_id = tlet.exam_type_id;

-- ---------------------------------------------Location
-- Create View
CREATE VIEW v_lo_areas AS
SELECT area_id, area_name
FROM tbl_lo_areas;

-- Create View
CREATE VIEW v_lo_area_options AS
SELECT 
	area_id AS area_value, 
	area_name AS area_label
FROM tbl_lo_areas;

-- Create View
CREATE VIEW v_lo_job_positions AS
SELECT job_position_id, job_position_name
FROM tbl_lo_job_positions;

-- Create View
CREATE VIEW v_lo_job_position_options AS
SELECT 
	job_position_id AS job_position_value, 
	job_position_name AS job_position_label
FROM tbl_lo_job_positions;

-- Create View
CREATE VIEW v_lo_managements AS
SELECT management_id, management_name
FROM tbl_lo_managements;

-- Create View
CREATE VIEW v_lo_management_options AS
SELECT 
	management_id AS management_value, 
	management_name AS management_label
FROM tbl_lo_managements;

-- Create View
CREATE VIEW v_lo_branches AS
SELECT branch_id, branch_name, company_id, city_name
FROM tbl_lo_branches tlb
JOIN tbl_lo_cities tlc ON tlc.city_id = tlb.city_id;

-- Create View
CREATE VIEW v_lo_companies AS
SELECT 
	tlc.company_id, 
	tlc.company_ruc, 
	tlc.company_name, 
	tlc.company_address, 
	tlc.company_phone, 
	COUNT(tlb.branch_id) > 0 AS company_has_branches, 
	tlc.corporative_id
FROM tbl_lo_companies tlc
JOIN tbl_lo_branches tlb ON tlb.company_id = tlc.company_id
GROUP BY tlc.company_id, 
	tlc.company_ruc, 
	tlc.company_name, 
	tlc.company_address, 
	tlc.company_phone, 
	tlc.corporative_id;

-- Create View
CREATE VIEW v_lab_company_options AS
SELECT 
	tlb.branch_id AS branch_value, 
	tlb.branch_name AS branch_label, 
	tlc.company_id AS company_value, 
	CONCAT(company_ruc,'-',tlc.company_name) AS company_label
FROM tbl_lo_companies tlc
JOIN tbl_lo_branches tlb ON tlb.company_id = tlc.company_id;

-- Create View
CREATE VIEW v_lo_corporative_groups AS
SELECT 
	tlcg.corporative_id, 
	tlcg.corporative_name, 
	COUNT(tlc.company_id) > 0 AS company_has_companies
FROM tbl_lo_corporative_groups tlcg
JOIN tbl_lo_companies tlc ON tlc.corporative_id = tlcg.corporative_id
GROUP BY tlcg.corporative_id, 
	tlcg.corporative_name;

-- Create View
CREATE VIEW v_lab_corporative_options AS
SELECT 
	tlc.company_id AS company_value, 
	CONCAT(company_ruc,'-',tlc.company_name) AS company_label,
	tlcg.corporative_id AS corporative_value, 
	tlcg.corporative_name AS corporative_label
FROM tbl_lo_corporative_groups tlcg
JOIN tbl_lo_companies tlc ON tlc.corporative_id = tlcg.corporative_id;

-- ---------------------------------------------Profile
-- Create View
CREATE VIEW v_u_doctors AS
SELECT 
	tuu.user_id, 
	tuu.user_dni, 
	tuu.user_email, 
	tuu.user_name, 
	tuu.user_lastname, 
	tuu.user_auth IS NOT NULL AS user_has_auth, 
	tud.doctor_signature, 
	tud.doctor_has_file
FROM tbl_u_doctors tud
JOIN tbl_u_users tuu ON tuu.user_id = tud.user_id;

-- Create View
CREATE VIEW v_u_doctor_options AS
SELECT tuu.user_dni AS doctor_value, 
    CONCAT(tuu.user_name, ' ', tuu.user_lastname) doctor_label
FROM tbl_u_doctors tud
JOIN tbl_u_users tuu ON tuu.user_id = tud.user_id;

-- Create View
CREATE VIEW v_u_attributes AS
SELECT user_attribute_id, user_attribute_name, user_attribute_value, user_id
FROM tbl_u_attributes;

-- Create View
CREATE VIEW v_u_users AS
SELECT user_id, user_dni, user_email, user_name, user_lastname, user_auth AS auth_id
FROM tbl_u_users
WHERE user_auth IS NOT NULL AND is_active = 1;
-- Create View
DROP VIEW v_m_clients;
CREATE VIEW v_m_clients AS
SELECT 
	DISTINCT tmc.medical_client_id AS medical_client_id,
	tmc.patient_dni AS patient_dni,
	tmc.patient_name AS patient_name,
	tmc.patient_lastname AS patient_lastname,
	tmc.patient_birthday AS patient_birthday,
	tmc.patient_gender AS patient_gender,
	tmc.patient_role AS patient_role,
	tmo.company_ruc AS company_ruc
FROM (tbl_m_clients tmc left join tbl_m_orders tmo on((tmo.medical_client_id = tmc.medical_client_id AND tmo.is_active = 1))) 
WHERE (tmc.is_active = 1)
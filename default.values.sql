INSERT INTO test.tbl_u_users (user_dni, user_email, user_name, user_lastname, user_status)
SELECT USER_CI, CONCAT(LOWER(REPLACE(USER_NAME, ' ', '.')),'.',LOWER(REPLACE(USER_LNAME, ' ', '.')), '@omega.com.ec'), USER_NAME, USER_LNAME, STATUS 
FROM auxiliar.`user`;
-- SELECT USER_CI, USER_EMAIL, USER_NAME, USER_LNAME, STATUS 

INSERT INTO test.tbl_u_patients (patient_gender, patient_birthday, user_id)
SELECT CASE WHEN U.USER_GENDER = 'M' THEN 'male' ELSE 'female' END, 
CASE WHEN U.USER_BIRTHDAY IS NOT NULL THEN U.USER_BIRTHDAY ELSE NOW() END
FROM auxiliar.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni 
WHERE U.IS_PATIENT = 1;

INSERT INTO test.tbl_u_doctors (doctor_signature, user_id)
SELECT '', U2.user_id
FROM auxiliar.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni  
WHERE U.IS_PATIENT = 0;

INSERT INTO test.tbl_d_disease_groups (disease_group_name)
SELECT MORBIDITY_GROUP_NAME FROM auxiliar.morbidity_group;

INSERT INTO test.tbl_d_diseases (disease_name, disease_group_id)
SELECT M.MORBIDITY_NAME, CUSTOM_MG.disease_group_id 
FROM auxiliar.morbidity as M
JOIN (
	SELECT MG.disease_group_id , OMG.MORBIDITY_GROUP_ID AS ORIGINAL_ID
	FROM test.tbl_d_disease_groups as MG
	JOIN auxiliar.morbidity_group as OMG ON OMG.MORBIDITY_GROUP_NAME = MG.disease_group_name 
) AS CUSTOM_MG ON CUSTOM_MG.ORIGINAL_ID = M.MORBIDITY_GROUP_ID;

-------------------------------------------------------- TEST PURPOSES --------------------------------------------
SELECT CONCAT('DELETE FROM test.', TABLE_NAME, ';')
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'test';

INSERT INTO test.tbl_u_users 
(user_id, user_dni, user_email, user_name, user_lastname, user_has_credential)
VALUES (1, '1751990332', 'developer@omega.com', 'sample', 'sample', 1);

INSERT INTO test.tbl_auth_credentials
(credential_id, credential_email, credential_password, user_id)
VALUES (1, 'developer@omega.com', '$2b$10$IHiDQf6/Z5Dlhk9erZdV2ew4eBMmfubHzaNuTDSfR1Y/68LZWvrcq', 1);

INSERT INTO test.tbl_auth_api_keys
(api_key_value, api_key_name, api_key_expires_at, api_key_status, credential_id)
VALUES('ddc3472e-8e55-4a20-9e40-54f43aaa5e12', 'SAMPLE KEY', '2034-04-06 11:29:44', 1, 1);

INSERT INTO test.tbl_ow_resources (resource_id, resource_name, resource_label, resource_address, resource_icon) VALUES 
(1,'users', 'Usuarios', '/omega/user', 'user'),
(2,'patients', 'Pacientes', '/omega/patient', 'patient'),
(3,'doctors', 'Medicos', '/omega/doctor', 'doctor'),
(4,'disease-group', 'Grupo de Morbilidades', '/omega/disease-group', 'morbidity-group'),
(5,'disease', 'Morbilidades', '/omega/disease', 'morbidity'),
(6,'medical-report', 'Reportes Medicos', '/omega/report', 'report'),
(7,'branch', 'Localizaciones', '/omega/locations', NULL),
(8,'role', 'Roles y Permisos', '/omega/role', NULL),
(9,'api-key', 'Api key', '/omega/api-key', NULL);

INSERT INTO test.tbl_ow_logos (logo_id, logo_name) VALUES
(1, 'omega');

INSERT INTO test.tbl_ow_clients (client_id, user_id, logo_id) VALUES 
(1, 1, 1);

INSERT INTO test.tbl_ow_clients_resources (client_id, resource_id) VALUES 
(1, 1),(1, 2),(1, 3),
(1, 4),(1, 5),(1, 6),
(1, 7),(1, 8),(1, 9);

INSERT INTO test.tbl_u_users (user_id, user_dni, user_email, user_name, user_lastname, user_has_credential) VALUES 
(2, '0604704015', 'doctor@omega.com', 'Omega', 'Salud Ocupacional', 0);

INSERT INTO test.tbl_u_doctors (doctor_id, doctor_signature, user_id) VALUES 
(2, 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 2);

INSERT INTO test.tbl_u_users (user_id, user_dni, user_email, user_name, user_lastname, user_has_credential) VALUES 
(3, '1751990456', 'paciente@omega.com', 'Paciente A', 'Omega S', 0);

INSERT INTO test.tbl_u_patients (patient_id, patient_gender, patient_birthday, user_id) VALUES 
(3, 'male', NOW(), 3);

INSERT INTO test.tbl_ac_clients (client_id, user_id) VALUES 
(1, 1);

INSERT INTO test.tbl_ac_roles (role_id, role_name, role_status) VALUES 
(1, 'API-KEY', 1),
(2, 'ROLES', 1),
(3, 'MORBILIDADES', 1),
(4, 'GRUPO DE MORBILIDADES', 1),
(5, 'LOCALIZACIONES', 1),
(6, 'REPORTES MEDICOS', 1),
(7, 'PACIENTES', 1),
(8, 'DOCTORES', 1),
(9, 'USUARIOS', 1);

INSERT INTO test.tbl_ac_clients_roles (client_id, role_id) VALUES
(1, 1), (1, 2), (1, 3),
(1, 4), (1, 5), (1, 6),
(1, 7), (1, 8), (1, 9);

INSERT INTO test.tbl_ac_resources (resource_id, resource_name, resource_claim) VALUES 
(1, 'api-key', 'create'),
(2, 'user-credential', 'create'),
(3, 'user-credential', 'update'),
(4, 'resource', 'read'),
(5, 'role', 'read'),
(6, 'role', 'create'),
(7, 'role', 'update'),
(8, 'role', 'delete'),
(9, 'access-control', 'update'),
(10, 'disease', 'read'),
(11, 'disease', 'create'),
(12, 'disease', 'update'),
(13, 'disease', 'delete'),
(14, 'disease-group', 'read'),
(15, 'disease-group', 'create'),
(16, 'disease-group', 'update'),
(17, 'disease-group', 'delete'),
(18, 'corporative-group', 'read'),
(19, 'city', 'read'),
(20, 'company', 'read'),
(21, 'branch', 'read'),
(22, 'medical-report', 'read'),
(23, 'medical-report', 'create'),
(24, 'medical-order', 'read'),
(25, 'medical-result', 'read'),
(26, 'medical-result', 'update'),
(27, 'doctors', 'read'),
(28, 'doctors', 'update'),
(29, 'patients', 'read'),
(30, 'users', 'create'),
(31, 'users', 'update'),
(32, 'users', 'delete'),
(33, 'users', 'read');

INSERT INTO test.tbl_ac_roles_resources (role_id, resource_id) VALUES
(1, 1),
(2, 4),(2, 5),(2, 6),(2, 7),(2, 8),
(3, 10),(3, 11),(3, 12),(3, 13),
(4, 14),(4, 15),(4, 16),(4, 17),
(5, 18),(5, 19),(5, 20),(5, 21),
(6, 22),(6, 23),(6, 25),
(7, 29),(7, 24),(7, 25),(7, 26),
(8, 27),(8, 28),(8, 30),(8, 9),
(9, 30),(9, 31),(9, 32),(9, 33),(9, 9);

INSERT INTO test.tbl_d_disease_groups (disease_group_id, disease_group_name) VALUES 
(1, 'SAMPLE GROUP');

INSERT INTO test.tbl_d_diseases (disease_id, disease_name, disease_group_id) VALUES 
(1, 'SAMPLE DISEASE', 1);

INSERT INTO test.tbl_lab_exams (exam_id, exam_name) VALUES 
(1, 'EXAMPLE EXAM'),
(2, 'EXAMPLE LAB EXAM');

INSERT INTO test.tbl_lo_corporative_groups (corporative_id, corporative_name) VALUES 
(1, 'SAMPLE GROUP');

INSERT INTO test.tbl_lo_cities (city_id, city_name) VALUES 
('UIO', 'Quito');

INSERT INTO test.tbl_lo_companies (company_id, company_ruc, company_name, company_address, company_phone, corporative_id) VALUES 
(1, '0604704015001', 'SAMPLE COMPANY', 'av.juanito y pepito', '099999999981', 1);

INSERT INTO test.tbl_lo_branches (branch_id, branch_name, company_id, city_id) VALUES
(1,'SAMPLE BRANCH', 1, 'UIO');

INSERT INTO test.tbl_mr_orders (order_id, patient_dni, patient_fullname, patient_birthday, corporative_name, company_name, company_ruc, branch_name, process_name) VALUES 
(1, '1751990456', 'Omega S Paciente A', CURRENT_DATE, 'SAMPLE GROUP', 'SAMPLE COMPANY', '0604704015001', 'SAMPLE BRANCH', 'Proceso 1'),
(2, '1751990456', 'Omega S Paciente A', CURRENT_DATE, 'SAMPLE GROUP', 'SAMPLE COMPANY', '0604704015001', 'SAMPLE BRANCH', 'Proceso 1'),
(3, '1751990456', 'Omega S Paciente A', CURRENT_DATE, 'SAMPLE GROUP', 'SAMPLE COMPANY', '0604704015001', 'SAMPLE BRANCH', 'Proceso 1'),
(4, '1751990456', 'Omega S Paciente A', CURRENT_DATE, 'SAMPLE GROUP', 'SAMPLE COMPANY', '0604704015001', 'SAMPLE BRANCH', 'Proceso 2'),
(5, '1751990456', 'Omega S Paciente A', CURRENT_DATE, 'SAMPLE GROUP', 'SAMPLE COMPANY', '0604704015001', 'SAMPLE BRANCH', 'Proceso 3');

INSERT INTO test.tbl_mr_results (result_file_name, exam_name, doctor_dni, doctor_fullname, doctor_signature, disease_id, disease_name, order_id, patient_dni) VALUES 
('1', 'EXAMPLE EXAM', '0604704015', 'Omega Salud Ocupacional', 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 1, 'SAMPLE DISEASE', 1, '1751990456'),
('2', 'EXAMPLE EXAM', '0604704015', 'Omega Salud Ocupacional', 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 1, 'SAMPLE DISEASE', 1, '1751990456'),
('3', 'EXAMPLE LAB EXAM', '0604704015', 'Omega Salud Ocupacional', 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 1, 'SAMPLE DISEASE', 1, '1751990456'),
('4', 'EXAMPLE LAB EXAM', '0604704015', 'Omega Salud Ocupacional', 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 1, 'SAMPLE DISEASE', 1, '1751990456'),
('5', 'EXAMPLE EXAM', '0604704015', 'Omega Salud Ocupacional', 'signatures\\1751990332\\7a3deb2c-197d-49e5-a0ea-804a427d59c8.jpg', 1, 'SAMPLE DISEASE', 1, '1751990456');
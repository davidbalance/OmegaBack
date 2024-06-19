SELECT CONCAT('DELETE FROM test.', TABLE_NAME, ';')
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'test';

SELECT CONCAT('ALTER TABLE test.', TABLE_NAME, ' ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;')
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'test';

SELECT CONCAT('ALTER TABLE test.', TABLE_NAME, ' DROP COLUMN old_key;')
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'test';

DELETE FROM test.tbl_auth_api_keys;
DELETE FROM test.tbl_auth_credentials;
DELETE FROM test.tbl_auth_tokens;
DELETE FROM test.tbl_d_disease_groups;
DELETE FROM test.tbl_d_diseases;
DELETE FROM test.tbl_developer_logs;
DELETE FROM test.tbl_lab_exam_external_key;
DELETE FROM test.tbl_lab_exams;
DELETE FROM test.tbl_lo_branch_external_key;
DELETE FROM test.tbl_lo_branches;
DELETE FROM test.tbl_lo_cities;
DELETE FROM test.tbl_lo_companies;
DELETE FROM test.tbl_lo_company_external_key;
DELETE FROM test.tbl_lo_corporative_external_key;
DELETE FROM test.tbl_lo_corporative_groups;
DELETE FROM test.tbl_mr_email;
DELETE FROM test.tbl_mr_medical_client;
DELETE FROM test.tbl_mr_medical_email;
DELETE FROM test.tbl_mr_order_external_key;
DELETE FROM test.tbl_mr_orders;
DELETE FROM test.tbl_mr_orders_email;
DELETE FROM test.tbl_mr_reports;
DELETE FROM test.tbl_mr_reports_send_attributes;
DELETE FROM test.tbl_mr_result_external_key;
DELETE FROM test.tbl_mr_result_send_attributes;
DELETE FROM test.tbl_mr_results;
DELETE FROM test.tbl_ow_clients;
DELETE FROM test.tbl_ow_clients_resources;
DELETE FROM test.tbl_ow_logos;
DELETE FROM test.tbl_ow_resources;
DELETE FROM test.tbl_u_doctors;
DELETE FROM test.tbl_u_patients;
DELETE FROM test.tbl_u_user_attribute;
DELETE FROM test.tbl_u_users;

INSERT INTO test.tbl_u_users
(user_id, user_dni, user_email, user_name, user_lastname, user_has_credential) VALUES 
(1, '1751990332', 'developer1@omega.com', 'Developer', ' ', 1),
(2, '9999999999', 'developer2@omega.com', 'Developer', ' ', 1);

INSERT INTO test.tbl_u_user_attribute(extra_name, extra_value, user_id) VALUES
('look_for_company', '1791754794001', 1), ('look_for_company', '1791754794001', 2);

INSERT INTO test.tbl_auth_credentials (credential_id, credential_email, credential_password, user_id) VALUES 
(1, 'developer1@omega.com', '$2b$10$mnBrKp2G1xhCwrq2GDpIIOM0vbIUFYhyJMu.xeVx/gKiBRYQrK2e2', 1),
(2, 'developer2@omega.com', '$2b$10$mnBrKp2G1xhCwrq2GDpIIOM0vbIUFYhyJMu.xeVx/gKiBRYQrK2e2', 2);

INSERT INTO test.tbl_auth_api_keys (api_key_value, api_key_name, api_key_expires_at, api_key_status, credential_id) VALUES
('dac3472e-8e55-4a20-9e40-54f43aaa5e12', 'SAMPLE KEY', '2034-04-06 11:29:44', 1, 1),
('dbc3472e-8e55-4a20-9e40-54f43aaa5e12', 'SAMPLE KEY', '2034-04-06 11:29:44', 1, 2);

INSERT INTO test.tbl_ow_resources (resource_id, resource_name, resource_label, resource_address, resource_icon) VALUES 
(1,'admin-users', 'Admin. Usuarios', '/omega/admin/user', 'user'),
(2,'admin-patients', 'Admin. Pacientes', '/omega/admin/patient', 'patient'),
(3,'doctors', 'Admin. Medicos', '/omega/doctor', 'doctor'),
(4,'disease', 'Morbilidades', '/omega/disease', 'morbidity'),
(5,'patients', 'Pacientes', '/omega/patient', 'patient'),
(6,'medical-report', 'Reportes Medicos', '/omega/report', 'report'),
(7,'branch', 'Localizaciones', '/omega/locations', "location"),
(8,'api-key', 'Api key', '/omega/api-key', "key");

INSERT INTO test.tbl_ow_logos (logo_id, logo_name) VALUES
(1, 'omega'),
(2, 'eeq'),
(3, 'ipeges');

INSERT INTO test.tbl_ow_clients (client_id, user_id, logo_id) VALUES 
(1, 1, 1),
(2, 2, 1);

INSERT INTO test.tbl_ow_clients_resources (client_id, resource_id) VALUES 
(1, 1),(1, 2),(1, 3),(1, 4),(1, 5),(1, 6),(1, 7),(1, 8),
(2, 1),(2, 2),(2, 3),(2, 4),(2, 5),(2, 6),(2, 7),(2, 8);

INSERT INTO test.tbl_lo_cities (city_id, city_name) VALUES
(1,'Ambato'),(2,'Arajuno'),(3,'Archidona'),(4,'Atacames'),(5,'Atuntaqui'),(6,'Azogues'),(7,'Babahoyo'),(8,'Baeza'),(9,'Bahía de Caráquez'),(10,'Balao'),
(11,'Balsas'),(12,'Balzar'),(13,'Baños de Agua Santa'),(14,'Bucay'),(15,'Calceta'),(16,'Carlos Julio Arosemena Tola'),(17,'Catarama'),(18,'Chone'),(19,'Coca'),(20,'Colimes'),
(21,'Coronel Marcelino Maridueña'),(22,'Cotacachi'),(23,'Cuenca'),(24,'Daule'),(25,'Durán'),(26,'El Chaco'),(27,'El Empalme'),(28,'El Guabo'),(29,'El Triunfo'),(30,'Esmeraldas'),
(31,'Gualaquiza'),(32,'Guaranda'),(33,'Guayaquil'),(34,'Huaquillas'),(35,'Ibarra'),(36,'Isidro Ayora'),(37,'Jama'),(38,'Jujan'),(39,'La Concordia'),(40,'La Libertad'),
(41,'Lago Agrio'),(42,'Latacunga'),(43,'Limones'),(44,'Logroño'),(45,'Loja'),(46,'Lomas de Sargentillo'),(47,'Macas'),(48,'Machala'),(49,'Manta'),(50,'Mera'),
(51,'Milagro'),(52,'Montecristi'),(53,'Muisne'),(54,'Naranjal'),(55,'Nobol'),(56,'Nuevo Rocafuerte'),(57,'Otavalo'),(58,'Paján'),(59,'Palestina'),(60,'Palora'),
(61,'Pasaje'),(62,'Pedernales'),(63,'Pedro Carbo'),(64,'Pichincha'),(65,'Pimampiro'),(66,'Piñas'),(67,'Playas'),(68,'Portovelo'),(69,'Portoviejo'),(70,'Puerto Ayora'),
(71,'Puerto Baquerizo Moreno'),(72,'Puerto El Carmen de Putumayo'),(73,'Puerto López'),(74,'Puerto Villamil'),(75,'Puyo'),(76,'Quevedo'),(77,'Quinindé'),(78,'Quito'),(79,'Riobamba'),(80,'Rioverde'),
(81,'Rocafuerte'),(82,'San Lorenzo'),(83,'San Vicente'),(84,'Santa Rosa'),(85,'Santo Domingo'),(86,'Salinas'),(87,'Samborondón'),(88,'Santa Elena'),(89,'Simón Bolívar'),(90,'Sucre'),
(91,'Sucúa'),(92,'Tarapoa'),(93,'Tena'),(94,'Tosagua'),(95,'Tulcán'),(96,'Urcuquí'),(97,'Valencia'),(98,'Ventanas'),(99,'Vinces'),(100,'Yaguachi'),
(101,'Yantzaza'),(102,'Zamora'),(103,'Zaruma');

-- ----------------------------------------------------------------------------------------------------------

ALTER TABLE test.tbl_auth_api_keys ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_auth_credentials ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_auth_tokens ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_d_disease_groups ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_d_diseases ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_developer_logs ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lab_exam_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lab_exams ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_branch_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_branches ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_cities ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_companies ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_company_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_corporative_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_corporative_groups ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_medical_client ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_medical_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_order_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_orders ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_orders_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_reports ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_reports_send_attributes ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_result_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_result_send_attributes ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_results ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_clients ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_clients_resources ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_logos ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_resources ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_doctors ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_patients ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_user_attribute ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_users ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;

INSERT INTO test.tbl_u_users (user_dni, user_email, user_name, user_lastname, user_status, old_key)
SELECT
SUBSTRING(USER_CI, 1, 10), 
CASE
	WHEN IS_PATIENT = 1 THEN NULL
	ELSE USER_EMAIL 
END, USER_NAME, USER_LNAME, 
CASE 
	WHEN STATUS IS NULL THEN 0
	ELSE STATUS 
END,
USER_ID
FROM omega_frame.`user`
WHERE SUBSTRING(USER_CI, 1, 10) NOT IN (SELECT user_dni FROM test.tbl_u_users) AND 
USER_ID NOT IN ('84y2j7','2i9k3u','25rot6','4s7y30','o6p2cd','ovsqp8','p182y3','qx507j','g7t1k5','w8b6cl','ty9224','yj3916');

INSERT INTO test.tbl_u_patients (patient_gender, patient_birthday, user_id, old_key)
SELECT CASE 
	WHEN U.USER_GENDER = 'M' THEN 'male' ELSE 'female' 
END, 
CASE 
	WHEN U.USER_BIRTHDAY IS NOT NULL AND SUBSTRING(U.USER_BIRTHDAY, 1, 10) != '0000-00-00' THEN SUBSTRING(U.USER_BIRTHDAY, 1, 10)
	ELSE NOW()
END,
U2.user_id,
U.USER_ID
FROM omega_frame.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni
WHERE U.IS_PATIENT = 1 AND U2.user_id NOT IN (SELECT user_id FROM test.tbl_u_patients);

INSERT INTO test.tbl_u_user_attribute (extra_name, extra_value, user_id)
SELECT 'employee_of', C.COMPANY_RUC, p.user_id
FROM test.tbl_u_patients AS p
LEFT JOIN omega_frame.`user` AS U2 ON p.old_key = U2.USER_ID
LEFT JOIN omega_frame.company AS C ON C.COMPANY_ID = U2.COMPANY_ID;

INSERT INTO test.tbl_u_doctors (doctor_signature, user_id, old_key)
SELECT '', U2.user_id, U.USER_ID
FROM omega_frame.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni  
WHERE U.IS_PATIENT = 0 AND U2.user_id NOT IN (SELECT user_id FROM test.tbl_u_doctors);

INSERT INTO test.tbl_u_user_attribute (extra_name, extra_value, user_id)
SELECT 'doctor_of', C.COMPANY_RUC, d.user_id
FROM test.tbl_u_doctors AS d
LEFT JOIN omega_frame.`user` AS U2 ON d.old_key = U2.USER_ID
LEFT JOIN omega_frame.company AS C ON C.COMPANY_ID = U2.COMPANY_ID;

INSERT INTO test.tbl_d_disease_groups (disease_group_name, old_key)
SELECT mg.MORBIDITY_GROUP_NAME, mg.MORBIDITY_GROUP_ID
FROM omega_frame.morbidity_group mg
WHERE mg.MORBIDITY_GROUP_ID NOT IN (SELECT old_key FROM test.tbl_d_disease_groups);

INSERT INTO test.tbl_d_diseases (disease_name, disease_group_id, old_key)
SELECT M.MORBIDITY_NAME, CUSTOM_MG.disease_group_id , M.MORBIDITY_ID 
FROM omega_frame.morbidity as M
JOIN (
	SELECT MG.disease_group_id , OMG.MORBIDITY_GROUP_ID AS ORIGINAL_ID
	FROM test.tbl_d_disease_groups as MG
	JOIN omega_frame.morbidity_group as OMG ON OMG.MORBIDITY_GROUP_NAME = MG.disease_group_name 
) AS CUSTOM_MG ON CUSTOM_MG.ORIGINAL_ID = M.MORBIDITY_GROUP_ID
WHERE M.MORBIDITY_ID NOT IN (SELECT old_key FROM test.tbl_d_diseases) AND
M.MORBIDITY_ID NOT IN (104,158);

INSERT INTO test.tbl_lab_exams ( exam_name, old_key )
SELECT t.TEST_NAME, t.TEST_ID 
FROM omega_frame.test as t
WHERE t.TEST_ID NOT IN (SELECT old_key FROM test.tbl_lab_exams);

INSERT INTO test.tbl_lo_corporative_groups (corporative_name, old_key)
SELECT cg.COMPANY_GROUP_NAME, cg.COMPANY_GROUP_ID 
FROM omega_frame.company_group as cg
WHERE cg.COMPANY_GROUP_ID NOT IN (SELECT old_key FROM test.tbl_lo_corporative_groups);

INSERT INTO test.tbl_lo_companies (company_ruc, company_name, company_address, company_phone, corporative_id, old_key)
SELECT c.COMPANY_RUC, c.COMPANY_NAME, c.COMPANY_ADDRESS, c.COMPANY_PHONE, tlcg.corporative_id, c.COMPANY_ID
FROM omega_frame.company as c
JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.old_key = c.GROUP_ID 
WHERE c.COMPANY_ID NOT IN (SELECT old_key FROM test.tbl_lo_companies) AND c.COMPANY_ID NOT IN ('n3j81','v1l03','5fd0','6551', 'h6sf7','21db','d82c');

INSERT INTO test.tbl_lo_branches (branch_name, city_id, company_id, old_key)
SELECT b.BRANCHO_NAME, 78, tlc.company_id, b.BRANCHO_ID
FROM omega_frame.branchO as b
JOIN test.tbl_lo_companies tlc ON tlc.old_key = b.COMPANY_ID
WHERE b.BRANCHO_ID NOT IN (SELECT old_key FROM test.tbl_lo_branches);

INSERT INTO test.tbl_mr_medical_client (medical_client_dni, medical_client_fullname, medical_client_birthday, old_key)
SELECT u.user_dni, CONCAT(u.user_name , ' ',u.user_lastname), p.patient_birthday, p.old_key FROM test.tbl_u_patients p
LEFT JOIN test.tbl_u_users u ON u.user_id = p.user_id
WHERE u.old_key IS NOT NULL;

INSERT INTO test.tbl_mr_medical_email (medical_email_email, medical_client_id, old_key)
SELECT u.USER_EMAIL, tmmc.medical_client_id, u.USER_ID 
FROM omega_frame.`user` u
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = u.USER_ID
WHERE u.USER_ID IN (SELECT old_key FROM test.tbl_u_patients WHERE old_key IS NOT NULL);

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM omega_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN omega_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN omega_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM omega_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN omega_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN omega_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN omega_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN omega_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN omega_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN omega_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN omega_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

UPDATE test.tbl_mr_medical_client SET old_key ='84y2j7' WHERE old_key='5mq0vo';
UPDATE test.tbl_mr_medical_client SET old_key ='2i9k3u' WHERE old_key='9vg1q6';
UPDATE test.tbl_mr_medical_client SET old_key ='25rot6' WHERE old_key='9z8cjg';
UPDATE test.tbl_mr_medical_client SET old_key ='4s7y30' WHERE old_key='e37t77';
UPDATE test.tbl_mr_medical_client SET old_key ='o6p2cd' WHERE old_key='b97srj';
UPDATE test.tbl_mr_medical_client SET old_key ='ovsqp8' WHERE old_key='5mly52';
UPDATE test.tbl_mr_medical_client SET old_key ='p182y3' WHERE old_key='2o218r';
UPDATE test.tbl_mr_medical_client SET old_key ='qx507j' WHERE old_key='085k7r';
UPDATE test.tbl_mr_medical_client SET old_key ='g7t1k5' WHERE old_key='smk01b';
UPDATE test.tbl_mr_medical_client SET old_key ='w8b6cl' WHERE old_key='436o83';
UPDATE test.tbl_mr_medical_client SET old_key ='ty9224' WHERE old_key='y28t43';
UPDATE test.tbl_mr_medical_client SET old_key ='yj3916' WHERE old_key='oo55n7';

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM omega_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN omega_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN omega_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM omega_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN omega_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN omega_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN omega_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN omega_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN omega_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN omega_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN omega_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

ALTER TABLE test.tbl_auth_api_keys DROP COLUMN old_key;
ALTER TABLE test.tbl_auth_credentials DROP COLUMN old_key;
ALTER TABLE test.tbl_auth_tokens DROP COLUMN old_key;
ALTER TABLE test.tbl_d_disease_groups DROP COLUMN old_key;
ALTER TABLE test.tbl_d_diseases DROP COLUMN old_key;
ALTER TABLE test.tbl_developer_logs DROP COLUMN old_key;
ALTER TABLE test.tbl_lab_exam_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lab_exams DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_branch_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_branches DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_cities DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_companies DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_company_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_corporative_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_corporative_groups DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_medical_client DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_medical_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_order_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_orders DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_orders_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_reports DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_reports_send_attributes DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_result_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_result_send_attributes DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_results DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_clients DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_clients_resources DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_logos DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_resources DROP COLUMN old_key;
ALTER TABLE test.tbl_u_doctors DROP COLUMN old_key;
ALTER TABLE test.tbl_u_patients DROP COLUMN old_key;
ALTER TABLE test.tbl_u_user_attribute DROP COLUMN old_key;
ALTER TABLE test.tbl_u_users DROP COLUMN old_key;

-- --------------------------------------------------------------------------------------------------------------

ALTER TABLE test.tbl_auth_api_keys ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_auth_credentials ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_auth_tokens ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_d_disease_groups ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_d_diseases ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_developer_logs ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lab_exam_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lab_exams ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_branch_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_branches ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_cities ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_companies ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_company_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_corporative_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_lo_corporative_groups ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_medical_client ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_medical_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_order_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_orders ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_orders_email ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_reports ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_reports_send_attributes ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_result_external_key ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_result_send_attributes ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_mr_results ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_clients ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_clients_resources ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_logos ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_ow_resources ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_doctors ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_patients ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_user_attribute ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;
ALTER TABLE test.tbl_u_users ADD COLUMN old_key VARCHAR(256) DEFAULT NULL;

INSERT INTO test.tbl_u_users (user_dni, user_email, user_name, user_lastname, user_status, old_key)
SELECT
SUBSTRING(USER_CI, 1, 10), 
CASE
	WHEN IS_PATIENT = 1 THEN CONCAT(REPLACE(LOWER(USER_NAME),' ', '_'), '.', REPLACE(LOWER(USER_LNAME),' ', '_'), '@omega.com.ec')
	ELSE USER_EMAIL 
END, USER_NAME, USER_LNAME, 
CASE 
	WHEN STATUS IS NULL THEN 0
	ELSE STATUS 
END,
USER_ID
FROM laboratorio_frame.`user`
WHERE SUBSTRING(USER_CI, 1, 10) NOT IN (SELECT user_dni FROM test.tbl_u_users) AND
USER_ID NOT IN (
'qjm3rh','k3p8g0','8dhkf2','6u6621','d8tqx4','9iliur','ez0m4q','tc45p8','3j3a6b','7nqcf6','3da5hq','6264cz','808n8r','10c4l7','b4ko42',
't2579h','v0i40f','40p539','16xx3w','2m8644','vo474m','vgu30u','krqh1p','dpq0w5','4851tm','e91q2s','rsh1lu','686d08','ll8p42','s9d1k3',
'1x1p3o','qn43yk','3753l4','795f4m','4rb5om','n6l0z2','1e8afb','80gr3f','u4fe0l','9i14az','e9feyp','r7r47c','u63375','728t65','7254x7',
'8099hc','84sj9m','ivvn7z','17n7xc','66vr55','rg9280','1b5s0d','isw704','f3kt57','2f78th','n86q2a','jpuqs5','m8v7yt','uqy0jm','23qal6',
'i3r5p3','go1320','m3e550','r6w7js','pu8q60','0s0g6w','7uy86m','vdt42u','ok5g8d','n1p6j9','pom80q','5ia90q','7qnd32','2mgfi9','98ocys',
'v6590u','e29783','24roaj','65vfl7','8e7q87','16c9pr','89788m','hr785d','2v4vh9','596l6l','7y6n83','cil7s9','43go70','54289w','bcftp0',
'1f13v8','kf8307','c0woqe','45902c','4bfnt7','9ahp0p','4ech39','x4d979','wyt705','9x03c6','56515i','0gz855','3wp95x','p9kib8','gn24c4',
'2geie9','wsr69o','8m8n07','xrd38p','j20hgy','z4q1x8','x26l05','0kz0u1','176998','86xzo2','7ys22z','r69007','hd6s9b','06o2c0','x1h826',
'v74b12','3nsm41','oxzlvg','sk7r2b','xl142t','2502fr','1al7y1','lf928n','94a56f','iwn2ot','g82pn3','85ya58','5t9ro9','m46534','859rv1',
'0rn195','o92n4u','0qds57','ko83f3','i6qgp4','jaz547','9x7159','2949x4','3624n5','92j07v','2nk1wm','wv4977','34zz30','q0d5ln','d78t2b',
'4vj0gw','hhh817','95es81','93ze42','8b7um0','w71ibu','4s8692','r256r5','mpk444','578307','lhp5fa','p3o57h','84t4i7','v19twq','41g502',
'49mej0','y88112','f3452t','88bu6w','h3jnbr','3emn7z','214wol','9ee550','7f4076','c24fx5','80lf4o','8h05q5','d36n8g','58ltjv','8r1553',
'194s72','l8708w','bb8971','shhj7e','2zm9r8','529lr5','no5761','7719no','y9nkkv','887pcy','fh861g','4174sk','48cwu0','n45os8','j3n1p8',
'j3n1p8','wqalqf','14ktn9','552339','k22839','dygj8b','j539ju','i5n15x','9xrr2p','7g5l3f','251f06','nf8g05','flxj0j','o3u0fu','097eva',
'm619i9','t91g1y','14yo28','gz3892','c832cw','4ggdyd','7ym661','464454','dionm0'
);

INSERT INTO test.tbl_u_patients (patient_gender, patient_birthday, user_id, old_key)
SELECT CASE 
	WHEN U.USER_GENDER = 'M' THEN 'male' ELSE 'female' 
END, 
CASE 
	WHEN U.USER_BIRTHDAY IS NOT NULL AND SUBSTRING(U.USER_BIRTHDAY, 1, 10) != '0000-00-00' THEN SUBSTRING(U.USER_BIRTHDAY, 1, 10)
	ELSE NOW()
END,
U2.user_id,
U.USER_ID
FROM laboratorio_frame.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni
WHERE U.IS_PATIENT = 1 AND U2.user_id NOT IN (SELECT user_id FROM test.tbl_u_patients) AND U.USER_ID NOT IN (
'qjm3rh','k3p8g0','8dhkf2','6u6621','d8tqx4','9iliur','ez0m4q','tc45p8','3j3a6b',
'7nqcf6','3da5hq','6264cz','808n8r','10c4l7','b4ko42','t2579h','v0i40f','40p539',
'16xx3w','2m8644','vo474m','vgu30u','krqh1p','dpq0w5','4851tm','e91q2s','rsh1lu',
'686d08','ll8p42','s9d1k3','1x1p3o','qn43yk','3753l4','795f4m','4rb5om','n6l0z2',
'1e8afb','80gr3f','u4fe0l','9i14az','e9feyp','r7r47c','u63375','728t65','7254x7',
'8099hc','84sj9m','ivvn7z','17n7xc','66vr55','rg9280','1b5s0d','isw704','f3kt57',
'2f78th','n86q2a','jpuqs5','m8v7yt','uqy0jm','23qal6','i3r5p3','go1320','m3e550',
'r6w7js','pu8q60','0s0g6w','7uy86m','vdt42u','ok5g8d','n1p6j9','pom80q','5ia90q',
'7qnd32','2mgfi9','98ocys','v6590u','e29783','24roaj','65vfl7','8e7q87','16c9pr',
'89788m','hr785d','2v4vh9','596l6l','7y6n83','cil7s9','43go70','54289w','bcftp0',
'1f13v8','kf8307','c0woqe','45902c','4bfnt7','9ahp0p','4ech39','x4d979','wyt705',
'9x03c6','56515i','0gz855','3wp95x','p9kib8','gn24c4','2geie9','wsr69o','8m8n07',
'xrd38p','j20hgy','z4q1x8','x26l05','0kz0u1','176998','86xzo2','7ys22z','r69007',
'hd6s9b','06o2c0','x1h826','v74b12','3nsm41','oxzlvg','sk7r2b','xl142t','2502fr',
'1al7y1','lf928n','94a56f','iwn2ot','g82pn3','85ya58','5t9ro9','m46534','859rv1',
'0rn195','o92n4u','0qds57','ko83f3','i6qgp4','jaz547','9x7159','2949x4','3624n5',
'92j07v','2nk1wm','wv4977','34zz30','q0d5ln','d78t2b','4vj0gw','hhh817','95es81',
'93ze42','8b7um0','w71ibu','4s8692','r256r5','mpk444','578307','lhp5fa','p3o57h',
'84t4i7','v19twq','41g502','49mej0','y88112','f3452t','88bu6w','h3jnbr','3emn7z',
'214wol','9ee550','7f4076','c24fx5','80lf4o','8h05q5','d36n8g','58ltjv','8r1553',
'194s72','l8708w','bb8971','shhj7e','2zm9r8','529lr5','no5761','7719no','y9nkkv',
'887pcy','86e229','fh861g','4174sk','48cwu0','n45os8','j3n1p8','wqalqf','14ktn9',
'552339','p7489o','4v216n','z3c12b','k169ei','13u9lv','bp5131','caa4vr','8vn39d'
);

INSERT INTO test.tbl_u_user_attribute (extra_name, extra_value, user_id)
SELECT 'employee_of', C.COMPANY_RUC, p.user_id
FROM test.tbl_u_patients AS p
LEFT JOIN laboratorio_frame.`user` AS U2 ON p.old_key = U2.USER_ID
LEFT JOIN laboratorio_frame.company AS C ON C.COMPANY_ID = U2.COMPANY_ID;

INSERT INTO test.tbl_u_doctors (doctor_signature, user_id, old_key)
SELECT '', U2.user_id, U.USER_ID
FROM laboratorio_frame.`user` AS U 
JOIN test.tbl_u_users AS U2 ON U.USER_CI = U2.user_dni  
WHERE U.IS_PATIENT = 0 AND U2.user_id NOT IN (SELECT user_id FROM test.tbl_u_doctors) AND U.USER_ID NOT IN (
'qjm3rh','k3p8g0','8dhkf2','6u6621','d8tqx4','9iliur','ez0m4q','tc45p8','3j3a6b',
'7nqcf6','3da5hq','6264cz','808n8r','10c4l7','b4ko42','t2579h','v0i40f','40p539',
'16xx3w','2m8644','vo474m','vgu30u','krqh1p','dpq0w5','4851tm','e91q2s','rsh1lu',
'686d08','ll8p42','s9d1k3','1x1p3o','qn43yk','3753l4','795f4m','4rb5om','n6l0z2',
'1e8afb','80gr3f','u4fe0l','9i14az','e9feyp','r7r47c','u63375','728t65','7254x7',
'8099hc','84sj9m','ivvn7z','17n7xc','66vr55','rg9280','1b5s0d','isw704','f3kt57',
'2f78th','n86q2a','jpuqs5','m8v7yt','uqy0jm','23qal6','i3r5p3','go1320','m3e550',
'r6w7js','pu8q60','0s0g6w','7uy86m','vdt42u','ok5g8d','n1p6j9','pom80q','5ia90q',
'7qnd32','2mgfi9','98ocys','v6590u','e29783','24roaj','65vfl7','8e7q87','16c9pr',
'89788m','hr785d','2v4vh9','596l6l','7y6n83','cil7s9','43go70','54289w','bcftp0',
'1f13v8','kf8307','c0woqe','45902c','4bfnt7','9ahp0p','4ech39','x4d979','wyt705',
'9x03c6','56515i','0gz855','3wp95x','p9kib8','gn24c4','2geie9','wsr69o','8m8n07',
'xrd38p','j20hgy','z4q1x8','x26l05','0kz0u1','176998','86xzo2','7ys22z','r69007',
'hd6s9b','06o2c0','x1h826','v74b12','3nsm41','oxzlvg','sk7r2b','xl142t','2502fr',
'1al7y1','lf928n','94a56f','iwn2ot','g82pn3','85ya58','5t9ro9','m46534','859rv1',
'0rn195','o92n4u','0qds57','ko83f3','i6qgp4','jaz547','9x7159','2949x4','3624n5',
'92j07v','2nk1wm','wv4977','34zz30','q0d5ln','d78t2b','4vj0gw','hhh817','95es81',
'93ze42','8b7um0','w71ibu','4s8692','r256r5','mpk444','578307','lhp5fa','p3o57h',
'84t4i7','v19twq','41g502','49mej0','y88112','f3452t','88bu6w','h3jnbr','3emn7z',
'214wol','9ee550','7f4076','c24fx5','80lf4o','8h05q5','d36n8g','58ltjv','8r1553',
'194s72','l8708w','bb8971','shhj7e','2zm9r8','529lr5','no5761','7719no','y9nkkv',
'887pcy','86e229','fh861g','4174sk','48cwu0','n45os8','j3n1p8','wqalqf','14ktn9',
'552339','p7489o','4v216n','z3c12b','k169ei','13u9lv','bp5131','caa4vr','8vn39d'
);

INSERT INTO test.tbl_u_user_attribute (extra_name, extra_value, user_id)
SELECT 'doctor_of', C.COMPANY_RUC, d.user_id
FROM test.tbl_u_doctors AS d
LEFT JOIN laboratorio_frame.`user` AS U2 ON d.old_key = U2.USER_ID
LEFT JOIN laboratorio_frame.company AS C ON C.COMPANY_ID = U2.COMPANY_ID;

INSERT INTO test.tbl_d_disease_groups (disease_group_name, old_key)
SELECT mg.MORBIDITY_GROUP_NAME, mg.MORBIDITY_GROUP_ID
FROM laboratorio_frame.morbidity_group mg
WHERE mg.MORBIDITY_GROUP_ID NOT IN (SELECT old_key FROM test.tbl_d_disease_groups);

INSERT INTO test.tbl_d_diseases (disease_name, disease_group_id, old_key)
SELECT M.MORBIDITY_NAME, CUSTOM_MG.disease_group_id , M.MORBIDITY_ID 
FROM laboratorio_frame.morbidity as M
JOIN (
	SELECT MG.disease_group_id , OMG.MORBIDITY_GROUP_ID AS ORIGINAL_ID
	FROM test.tbl_d_disease_groups as MG
	JOIN laboratorio_frame.morbidity_group as OMG ON OMG.MORBIDITY_GROUP_NAME = MG.disease_group_name 
) AS CUSTOM_MG ON CUSTOM_MG.ORIGINAL_ID = M.MORBIDITY_GROUP_ID
WHERE M.MORBIDITY_ID NOT IN (SELECT old_key FROM test.tbl_d_diseases);

INSERT INTO test.tbl_lab_exams ( exam_name, old_key )
SELECT t.TEST_NAME, t.TEST_ID 
FROM laboratorio_frame.test as t
WHERE t.TEST_ID NOT IN (SELECT old_key FROM test.tbl_lab_exams);

INSERT INTO test.tbl_lo_corporative_groups (corporative_name, old_key)
SELECT cg.COMPANY_GROUP_NAME, cg.COMPANY_GROUP_ID 
FROM laboratorio_frame.company_group as cg
WHERE cg.COMPANY_GROUP_ID NOT IN (SELECT old_key FROM test.tbl_lo_corporative_groups);

INSERT INTO test.tbl_lo_companies (company_ruc, company_name, company_address, company_phone, corporative_id, old_key)
SELECT c.COMPANY_RUC, c.COMPANY_NAME, c.COMPANY_ADDRESS, c.COMPANY_PHONE, tlcg.corporative_id, c.COMPANY_ID
FROM laboratorio_frame.company as c
JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.old_key = c.GROUP_ID 
WHERE c.COMPANY_ID NOT IN (SELECT old_key FROM test.tbl_lo_companies);

INSERT INTO test.tbl_lo_branches (branch_name, city_id, company_id, old_key)
SELECT b.BRANCHO_NAME, 78, tlc.company_id, b.BRANCHO_ID
FROM laboratorio_frame.branchO as b
JOIN test.tbl_lo_companies tlc ON tlc.old_key = b.COMPANY_ID
WHERE b.BRANCHO_ID NOT IN (SELECT old_key FROM test.tbl_lo_branches);

INSERT INTO test.tbl_mr_medical_client (medical_client_dni, medical_client_fullname, medical_client_birthday, old_key)
SELECT u.user_dni, CONCAT(u.user_name , ' ',u.user_lastname), p.patient_birthday, p.old_key FROM test.tbl_u_patients p
LEFT JOIN test.tbl_u_users u ON u.user_id = p.user_id
WHERE u.old_key IS NOT NULL;

INSERT INTO test.tbl_mr_medical_email (medical_email_email, medical_client_id, old_key)
SELECT u.USER_EMAIL, tmmc.medical_client_id, u.USER_ID 
FROM laboratorio_frame.`user` u
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = u.USER_ID
WHERE u.USER_ID IN (SELECT old_key FROM test.tbl_u_patients WHERE old_key IS NOT NULL);

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM laboratorio_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN laboratorio_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN laboratorio_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM laboratorio_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN laboratorio_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN laboratorio_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN laboratorio_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN laboratorio_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN laboratorio_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN laboratorio_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN laboratorio_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

UPDATE test.tbl_mr_medical_client SET old_key ='qjm3rh' WHERE old_key='jn26o4';
UPDATE test.tbl_mr_medical_client SET old_key ='k3p8g0' WHERE old_key='8vvat5';
UPDATE test.tbl_mr_medical_client SET old_key ='8dhkf2' WHERE old_key='qk818w';
UPDATE test.tbl_mr_medical_client SET old_key ='6u6621' WHERE old_key='l71pdf';
UPDATE test.tbl_mr_medical_client SET old_key ='d8tqx4' WHERE old_key='4b727q';
UPDATE test.tbl_mr_medical_client SET old_key ='9iliur' WHERE old_key='yvr2w8';
UPDATE test.tbl_mr_medical_client SET old_key ='ez0m4q' WHERE old_key='89md4a';
UPDATE test.tbl_mr_medical_client SET old_key ='tc45p8' WHERE old_key='td867t';
UPDATE test.tbl_mr_medical_client SET old_key ='3j3a6b' WHERE old_key='03a38q';
UPDATE test.tbl_mr_medical_client SET old_key ='7nqcf6' WHERE old_key='6ka451';
UPDATE test.tbl_mr_medical_client SET old_key ='3da5hq' WHERE old_key='974tdf';
UPDATE test.tbl_mr_medical_client SET old_key ='6264cz' WHERE old_key='ga6p15';
UPDATE test.tbl_mr_medical_client SET old_key ='808n8r' WHERE old_key='31gekm';
UPDATE test.tbl_mr_medical_client SET old_key ='10c4l7' WHERE old_key='i9395r';
UPDATE test.tbl_mr_medical_client SET old_key ='b4ko42' WHERE old_key='wl931z';
UPDATE test.tbl_mr_medical_client SET old_key ='t2579h' WHERE old_key='v6mmk2';
UPDATE test.tbl_mr_medical_client SET old_key ='v0i40f' WHERE old_key='w9c9lu';
UPDATE test.tbl_mr_medical_client SET old_key ='40p539' WHERE old_key='4u13dn';
UPDATE test.tbl_mr_medical_client SET old_key ='16xx3w' WHERE old_key='2so3af';
UPDATE test.tbl_mr_medical_client SET old_key ='2m8644' WHERE old_key='8hwsmp';
UPDATE test.tbl_mr_medical_client SET old_key ='vo474m' WHERE old_key='66kw29';
UPDATE test.tbl_mr_medical_client SET old_key ='vgu30u' WHERE old_key='1979f6';
UPDATE test.tbl_mr_medical_client SET old_key ='krqh1p' WHERE old_key='41319q';
UPDATE test.tbl_mr_medical_client SET old_key ='dpq0w5' WHERE old_key='fiq358';
UPDATE test.tbl_mr_medical_client SET old_key ='4851tm' WHERE old_key='nj7s0h';
UPDATE test.tbl_mr_medical_client SET old_key ='e91q2s' WHERE old_key='90nss6';
UPDATE test.tbl_mr_medical_client SET old_key ='rsh1lu' WHERE old_key='506e7p';
UPDATE test.tbl_mr_medical_client SET old_key ='686d08' WHERE old_key='9q0ma7';
UPDATE test.tbl_mr_medical_client SET old_key ='ll8p42' WHERE old_key='35y20v';
UPDATE test.tbl_mr_medical_client SET old_key ='s9d1k3' WHERE old_key='elq7xm';
UPDATE test.tbl_mr_medical_client SET old_key ='1x1p3o' WHERE old_key='2o70t4';
UPDATE test.tbl_mr_medical_client SET old_key ='qn43yk' WHERE old_key='70rpyq';
UPDATE test.tbl_mr_medical_client SET old_key ='3753l4' WHERE old_key='28wkfp';
UPDATE test.tbl_mr_medical_client SET old_key ='795f4m' WHERE old_key='yauh41';
UPDATE test.tbl_mr_medical_client SET old_key ='4rb5om' WHERE old_key='py5v6i';
UPDATE test.tbl_mr_medical_client SET old_key ='n6l0z2' WHERE old_key='nxc987';
UPDATE test.tbl_mr_medical_client SET old_key ='1e8afb' WHERE old_key='2lz16e';
UPDATE test.tbl_mr_medical_client SET old_key ='80gr3f' WHERE old_key='y3n60d';
UPDATE test.tbl_mr_medical_client SET old_key ='u4fe0l' WHERE old_key='00s331';
UPDATE test.tbl_mr_medical_client SET old_key ='9i14az' WHERE old_key='i309nz';
UPDATE test.tbl_mr_medical_client SET old_key ='e9feyp' WHERE old_key='020z38';
UPDATE test.tbl_mr_medical_client SET old_key ='r7r47c' WHERE old_key='b1ld84';
UPDATE test.tbl_mr_medical_client SET old_key ='u63375' WHERE old_key='053yt1';
UPDATE test.tbl_mr_medical_client SET old_key ='728t65' WHERE old_key='say492';
UPDATE test.tbl_mr_medical_client SET old_key ='7254x7' WHERE old_key='57d5k5';
UPDATE test.tbl_mr_medical_client SET old_key ='8099hc' WHERE old_key='6mizoe';
UPDATE test.tbl_mr_medical_client SET old_key ='84sj9m' WHERE old_key='536f83';
UPDATE test.tbl_mr_medical_client SET old_key ='ivvn7z' WHERE old_key='9sd5oo';
UPDATE test.tbl_mr_medical_client SET old_key ='17n7xc' WHERE old_key='k1tmwv';
UPDATE test.tbl_mr_medical_client SET old_key ='66vr55' WHERE old_key='0v02ad';
UPDATE test.tbl_mr_medical_client SET old_key ='rg9280' WHERE old_key='66r58f';
UPDATE test.tbl_mr_medical_client SET old_key ='1b5s0d' WHERE old_key='749eac';
UPDATE test.tbl_mr_medical_client SET old_key ='isw704' WHERE old_key='x6en9u';
UPDATE test.tbl_mr_medical_client SET old_key ='f3kt57' WHERE old_key='a39i4h';
UPDATE test.tbl_mr_medical_client SET old_key ='2f78th' WHERE old_key='1uq0gv';
UPDATE test.tbl_mr_medical_client SET old_key ='n86q2a' WHERE old_key='j64bi4';
UPDATE test.tbl_mr_medical_client SET old_key ='jpuqs5' WHERE old_key='j6o677';
UPDATE test.tbl_mr_medical_client SET old_key ='m8v7yt' WHERE old_key='br0sv5';
UPDATE test.tbl_mr_medical_client SET old_key ='uqy0jm' WHERE old_key='99a4bk';
UPDATE test.tbl_mr_medical_client SET old_key ='23qal6' WHERE old_key='j70mjx';
UPDATE test.tbl_mr_medical_client SET old_key ='i3r5p3' WHERE old_key='k6br80';
UPDATE test.tbl_mr_medical_client SET old_key ='go1320' WHERE old_key='j21283';
UPDATE test.tbl_mr_medical_client SET old_key ='m3e550' WHERE old_key='24zfc3';
UPDATE test.tbl_mr_medical_client SET old_key ='r6w7js' WHERE old_key='3izicw';
UPDATE test.tbl_mr_medical_client SET old_key ='pu8q60' WHERE old_key='h79quo';
UPDATE test.tbl_mr_medical_client SET old_key ='0s0g6w' WHERE old_key='95605i';
UPDATE test.tbl_mr_medical_client SET old_key ='7uy86m' WHERE old_key='t43n67';
UPDATE test.tbl_mr_medical_client SET old_key ='vdt42u' WHERE old_key='4ugkb9';
UPDATE test.tbl_mr_medical_client SET old_key ='ok5g8d' WHERE old_key='o09lb5';
UPDATE test.tbl_mr_medical_client SET old_key ='n1p6j9' WHERE old_key='37e0em';
UPDATE test.tbl_mr_medical_client SET old_key ='pom80q' WHERE old_key='9e77gg';
UPDATE test.tbl_mr_medical_client SET old_key ='5ia90q' WHERE old_key='docx4y';
UPDATE test.tbl_mr_medical_client SET old_key ='7qnd32' WHERE old_key='pr6edx';
UPDATE test.tbl_mr_medical_client SET old_key ='2mgfi9' WHERE old_key='2omo9z';
UPDATE test.tbl_mr_medical_client SET old_key ='98ocys' WHERE old_key='ps56n5';
UPDATE test.tbl_mr_medical_client SET old_key ='v6590u' WHERE old_key='gm4565';
UPDATE test.tbl_mr_medical_client SET old_key ='e29783' WHERE old_key='l3hsao';
UPDATE test.tbl_mr_medical_client SET old_key ='24roaj' WHERE old_key='0xn95l';
UPDATE test.tbl_mr_medical_client SET old_key ='65vfl7' WHERE old_key='tfwwzz';
UPDATE test.tbl_mr_medical_client SET old_key ='8e7q87' WHERE old_key='9890j7';
UPDATE test.tbl_mr_medical_client SET old_key ='16c9pr' WHERE old_key='3s11a2';
UPDATE test.tbl_mr_medical_client SET old_key ='89788m' WHERE old_key='ta0329';
UPDATE test.tbl_mr_medical_client SET old_key ='hr785d' WHERE old_key='z56c9k';
UPDATE test.tbl_mr_medical_client SET old_key ='2v4vh9' WHERE old_key='34766m';
UPDATE test.tbl_mr_medical_client SET old_key ='596l6l' WHERE old_key='uu6i1r';
UPDATE test.tbl_mr_medical_client SET old_key ='7y6n83' WHERE old_key='nmk068';
UPDATE test.tbl_mr_medical_client SET old_key ='cil7s9' WHERE old_key='jc057r';
UPDATE test.tbl_mr_medical_client SET old_key ='43go70' WHERE old_key='6965x6';
UPDATE test.tbl_mr_medical_client SET old_key ='54289w' WHERE old_key='ivv57e';
UPDATE test.tbl_mr_medical_client SET old_key ='bcftp0' WHERE old_key='rdr699';
UPDATE test.tbl_mr_medical_client SET old_key ='1f13v8' WHERE old_key='76424h';
UPDATE test.tbl_mr_medical_client SET old_key ='kf8307' WHERE old_key='u35p7y';
UPDATE test.tbl_mr_medical_client SET old_key ='c0woqe' WHERE old_key='8q55du';
UPDATE test.tbl_mr_medical_client SET old_key ='45902c' WHERE old_key='mf2a36';
UPDATE test.tbl_mr_medical_client SET old_key ='4bfnt7' WHERE old_key='33u6wg';
UPDATE test.tbl_mr_medical_client SET old_key ='9ahp0p' WHERE old_key='vunh0u';
UPDATE test.tbl_mr_medical_client SET old_key ='4ech39' WHERE old_key='96424o';
UPDATE test.tbl_mr_medical_client SET old_key ='x4d979' WHERE old_key='l2606e';
UPDATE test.tbl_mr_medical_client SET old_key ='wyt705' WHERE old_key='nap338';
UPDATE test.tbl_mr_medical_client SET old_key ='9x03c6' WHERE old_key='q121yv';
UPDATE test.tbl_mr_medical_client SET old_key ='56515i' WHERE old_key='168l1z';
UPDATE test.tbl_mr_medical_client SET old_key ='0gz855' WHERE old_key='l01g6d';
UPDATE test.tbl_mr_medical_client SET old_key ='3wp95x' WHERE old_key='2n219n';
UPDATE test.tbl_mr_medical_client SET old_key ='p9kib8' WHERE old_key='x7onzl';
UPDATE test.tbl_mr_medical_client SET old_key ='gn24c4' WHERE old_key='xa6716';
UPDATE test.tbl_mr_medical_client SET old_key ='2geie9' WHERE old_key='h2275j';
UPDATE test.tbl_mr_medical_client SET old_key ='wsr69o' WHERE old_key='43t6vx';
UPDATE test.tbl_mr_medical_client SET old_key ='8m8n07' WHERE old_key='iq6k7t';
UPDATE test.tbl_mr_medical_client SET old_key ='xrd38p' WHERE old_key='24n76f';
UPDATE test.tbl_mr_medical_client SET old_key ='j20hgy' WHERE old_key='80z3yq';
UPDATE test.tbl_mr_medical_client SET old_key ='z4q1x8' WHERE old_key='molo0h';
UPDATE test.tbl_mr_medical_client SET old_key ='x26l05' WHERE old_key='gh9jur';
UPDATE test.tbl_mr_medical_client SET old_key ='0kz0u1' WHERE old_key='kn315u';
UPDATE test.tbl_mr_medical_client SET old_key ='176998' WHERE old_key='j72q54';
UPDATE test.tbl_mr_medical_client SET old_key ='86xzo2' WHERE old_key='71iry6';
UPDATE test.tbl_mr_medical_client SET old_key ='7ys22z' WHERE old_key='5c19zy';
UPDATE test.tbl_mr_medical_client SET old_key ='r69007' WHERE old_key='76i5ws';
UPDATE test.tbl_mr_medical_client SET old_key ='hd6s9b' WHERE old_key='6x9p54';
UPDATE test.tbl_mr_medical_client SET old_key ='06o2c0' WHERE old_key='g3a8t2';
UPDATE test.tbl_mr_medical_client SET old_key ='x1h826' WHERE old_key='eugb84';
UPDATE test.tbl_mr_medical_client SET old_key ='v74b12' WHERE old_key='q168h0';
UPDATE test.tbl_mr_medical_client SET old_key ='3nsm41' WHERE old_key='t7smn4';
UPDATE test.tbl_mr_medical_client SET old_key ='oxzlvg' WHERE old_key='k91433';
UPDATE test.tbl_mr_medical_client SET old_key ='sk7r2b' WHERE old_key='2h58vr';
UPDATE test.tbl_mr_medical_client SET old_key ='xl142t' WHERE old_key='35gc3c';
UPDATE test.tbl_mr_medical_client SET old_key ='2502fr' WHERE old_key='vc6id4';
UPDATE test.tbl_mr_medical_client SET old_key ='1al7y1' WHERE old_key='t72e45';
UPDATE test.tbl_mr_medical_client SET old_key ='lf928n' WHERE old_key='ppb2x8';
UPDATE test.tbl_mr_medical_client SET old_key ='94a56f' WHERE old_key='q5qe6a';
UPDATE test.tbl_mr_medical_client SET old_key ='iwn2ot' WHERE old_key='3cc3oa';
UPDATE test.tbl_mr_medical_client SET old_key ='g82pn3' WHERE old_key='28825u';
UPDATE test.tbl_mr_medical_client SET old_key ='85ya58' WHERE old_key='eed6qf';
UPDATE test.tbl_mr_medical_client SET old_key ='5t9ro9' WHERE old_key='71500e';
UPDATE test.tbl_mr_medical_client SET old_key ='m46534' WHERE old_key='2p6bkt';
UPDATE test.tbl_mr_medical_client SET old_key ='859rv1' WHERE old_key='a2ul85';
UPDATE test.tbl_mr_medical_client SET old_key ='0rn195' WHERE old_key='cw0x35';
UPDATE test.tbl_mr_medical_client SET old_key ='o92n4u' WHERE old_key='67c50b';
UPDATE test.tbl_mr_medical_client SET old_key ='0qds57' WHERE old_key='jw214v';
UPDATE test.tbl_mr_medical_client SET old_key ='ko83f3' WHERE old_key='39y8jl';
UPDATE test.tbl_mr_medical_client SET old_key ='i6qgp4' WHERE old_key='30rwm3';
UPDATE test.tbl_mr_medical_client SET old_key ='jaz547' WHERE old_key='632u4u';
UPDATE test.tbl_mr_medical_client SET old_key ='9x7159' WHERE old_key='0nseht';
UPDATE test.tbl_mr_medical_client SET old_key ='2949x4' WHERE old_key='8405q9';
UPDATE test.tbl_mr_medical_client SET old_key ='3624n5' WHERE old_key='8i01g7';
UPDATE test.tbl_mr_medical_client SET old_key ='92j07v' WHERE old_key='y996r2';
UPDATE test.tbl_mr_medical_client SET old_key ='2nk1wm' WHERE old_key='6u9dcr';
UPDATE test.tbl_mr_medical_client SET old_key ='wv4977' WHERE old_key='184w8g';
UPDATE test.tbl_mr_medical_client SET old_key ='q0d5ln' WHERE old_key='00454o';
UPDATE test.tbl_mr_medical_client SET old_key ='d78t2b' WHERE old_key='hcit66';
UPDATE test.tbl_mr_medical_client SET old_key ='4vj0gw' WHERE old_key='5uy113';
UPDATE test.tbl_mr_medical_client SET old_key ='hhh817' WHERE old_key='j637ou';
UPDATE test.tbl_mr_medical_client SET old_key ='95es81' WHERE old_key='4mh5vq';
UPDATE test.tbl_mr_medical_client SET old_key ='93ze42' WHERE old_key='2f4k96';
UPDATE test.tbl_mr_medical_client SET old_key ='8b7um0' WHERE old_key='kzd7e9';
UPDATE test.tbl_mr_medical_client SET old_key ='w71ibu' WHERE old_key='l36hmd';
UPDATE test.tbl_mr_medical_client SET old_key ='4s8692' WHERE old_key='dnwl8i';
UPDATE test.tbl_mr_medical_client SET old_key ='r256r5' WHERE old_key='y9y33h';
UPDATE test.tbl_mr_medical_client SET old_key ='mpk444' WHERE old_key='qn9w2j';
UPDATE test.tbl_mr_medical_client SET old_key ='lhp5fa' WHERE old_key='16k030';
UPDATE test.tbl_mr_medical_client SET old_key ='p3o57h' WHERE old_key='eb60vo';
UPDATE test.tbl_mr_medical_client SET old_key ='84t4i7' WHERE old_key='079cp0';
UPDATE test.tbl_mr_medical_client SET old_key ='v19twq' WHERE old_key='61f42x';
UPDATE test.tbl_mr_medical_client SET old_key ='49mej0' WHERE old_key='6w3glw';
UPDATE test.tbl_mr_medical_client SET old_key ='y88112' WHERE old_key='553n85';
UPDATE test.tbl_mr_medical_client SET old_key ='f3452t' WHERE old_key='36k7v0';
UPDATE test.tbl_mr_medical_client SET old_key ='88bu6w' WHERE old_key='z97xzs';
UPDATE test.tbl_mr_medical_client SET old_key ='h3jnbr' WHERE old_key='9w2bcv';
UPDATE test.tbl_mr_medical_client SET old_key ='3emn7z' WHERE old_key='3i726i';
UPDATE test.tbl_mr_medical_client SET old_key ='214wol' WHERE old_key='eo2oln';
UPDATE test.tbl_mr_medical_client SET old_key ='9ee550' WHERE old_key='d2i5jd';
UPDATE test.tbl_mr_medical_client SET old_key ='7f4076' WHERE old_key='d6w07b';
UPDATE test.tbl_mr_medical_client SET old_key ='c24fx5' WHERE old_key='7bkau6';
UPDATE test.tbl_mr_medical_client SET old_key ='80lf4o' WHERE old_key='6x3ogu';
UPDATE test.tbl_mr_medical_client SET old_key ='8h05q5' WHERE old_key='4bur2y';
UPDATE test.tbl_mr_medical_client SET old_key ='d36n8g' WHERE old_key='359thy';
UPDATE test.tbl_mr_medical_client SET old_key ='58ltjv' WHERE old_key='ih6790';
UPDATE test.tbl_mr_medical_client SET old_key ='8r1553' WHERE old_key='03f81j';
UPDATE test.tbl_mr_medical_client SET old_key ='194s72' WHERE old_key='66s647';
UPDATE test.tbl_mr_medical_client SET old_key ='l8708w' WHERE old_key='1z1u21';
UPDATE test.tbl_mr_medical_client SET old_key ='bb8971' WHERE old_key='avqvsq';
UPDATE test.tbl_mr_medical_client SET old_key ='shhj7e' WHERE old_key='d8k3fv';
UPDATE test.tbl_mr_medical_client SET old_key ='2zm9r8' WHERE old_key='7w14wn';
UPDATE test.tbl_mr_medical_client SET old_key ='529lr5' WHERE old_key='dm8ni6';
UPDATE test.tbl_mr_medical_client SET old_key ='no5761' WHERE old_key='51rd79';
UPDATE test.tbl_mr_medical_client SET old_key ='7719no' WHERE old_key='9ss3v5';
UPDATE test.tbl_mr_medical_client SET old_key ='y9nkkv' WHERE old_key='p76636';
UPDATE test.tbl_mr_medical_client SET old_key ='887pcy' WHERE old_key='j0d468';
UPDATE test.tbl_mr_medical_client SET old_key ='fh861g' WHERE old_key='c1526m';
UPDATE test.tbl_mr_medical_client SET old_key ='4174sk' WHERE old_key='5o475b';
UPDATE test.tbl_mr_medical_client SET old_key ='48cwu0' WHERE old_key='v62jab';
UPDATE test.tbl_mr_medical_client SET old_key ='n45os8' WHERE old_key='kh2pwb';
UPDATE test.tbl_mr_medical_client SET old_key ='j3n1p8' WHERE old_key='dionm0';
UPDATE test.tbl_mr_medical_client SET old_key ='k22839' WHERE old_key='4j5xci';
UPDATE test.tbl_mr_medical_client SET old_key ='dygj8b' WHERE old_key='9rkqln';
UPDATE test.tbl_mr_medical_client SET old_key ='j539ju' WHERE old_key='d1399r';
UPDATE test.tbl_mr_medical_client SET old_key ='i5n15x' WHERE old_key='n84f20';
UPDATE test.tbl_mr_medical_client SET old_key ='9xrr2p' WHERE old_key='s2jfvw';
UPDATE test.tbl_mr_medical_client SET old_key ='7g5l3f' WHERE old_key='ke413d';
UPDATE test.tbl_mr_medical_client SET old_key ='251f06' WHERE old_key='8kk3kw';
UPDATE test.tbl_mr_medical_client SET old_key ='nf8g05' WHERE old_key='733ov7';
UPDATE test.tbl_mr_medical_client SET old_key ='flxj0j' WHERE old_key='518v9j';
UPDATE test.tbl_mr_medical_client SET old_key ='o3u0fu' WHERE old_key='4jsc65';
UPDATE test.tbl_mr_medical_client SET old_key ='097eva' WHERE old_key='hhpt02';
UPDATE test.tbl_mr_medical_client SET old_key ='m619i9' WHERE old_key='c1526m';
UPDATE test.tbl_mr_medical_client SET old_key ='t91g1y' WHERE old_key='1h11ix';
UPDATE test.tbl_mr_medical_client SET old_key ='14yo28' WHERE old_key='2rh0ao';
UPDATE test.tbl_mr_medical_client SET old_key ='gz3892' WHERE old_key='gauc8j';
UPDATE test.tbl_mr_medical_client SET old_key ='c832cw' WHERE old_key='7a5367';
UPDATE test.tbl_mr_medical_client SET old_key ='4ggdyd' WHERE old_key='65f29m';
UPDATE test.tbl_mr_medical_client SET old_key ='7ym661' WHERE old_key='gbz611';
UPDATE test.tbl_mr_medical_client SET old_key ='464454' WHERE old_key='6dgi4a';

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM laboratorio_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN laboratorio_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN laboratorio_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM laboratorio_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN laboratorio_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN laboratorio_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN laboratorio_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN laboratorio_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN laboratorio_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN laboratorio_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN laboratorio_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

UPDATE test.tbl_mr_medical_client SET old_key ='34zz30' WHERE old_key='wv4977';
UPDATE test.tbl_mr_medical_client SET old_key ='578307' WHERE old_key='mpk444';
UPDATE test.tbl_mr_medical_client SET old_key ='41g502' WHERE old_key='v19twq';
UPDATE test.tbl_mr_medical_client SET old_key ='86e229' WHERE old_key='887pcy';
UPDATE test.tbl_mr_medical_client SET old_key ='wqalqf' WHERE old_key='j3n1p8';

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM laboratorio_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN laboratorio_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN laboratorio_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM laboratorio_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN laboratorio_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN laboratorio_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN laboratorio_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN laboratorio_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN laboratorio_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN laboratorio_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN laboratorio_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

UPDATE test.tbl_mr_medical_client SET old_key ='14ktn9' WHERE old_key='wqalqf';

INSERT INTO test.tbl_mr_orders (medical_client_id, corporative_name, company_ruc, company_name, branch_name, process_name, old_key)
SELECT 
tmmc.medical_client_id,
branch.corporative_name, 
branch.company_ruc, 
branch.company_name, 
branch.branch_name, 
p.PROCESSES_NAME,
o.ORDER_ID
FROM laboratorio_frame.orders as o
LEFT JOIN test.tbl_mr_medical_client tmmc ON tmmc.old_key = o.USER_ID
LEFT JOIN laboratorio_frame.`user` AS u ON o.USER_ID = u.USER_ID
RIGHT JOIN (
	SELECT tlb.branch_id, tlb.branch_name, tlc.company_ruc, tlc.company_name, tlcg.corporative_name, tlb.old_key AS old_branch_id
	FROM test.tbl_lo_branches tlb
	LEFT JOIN test.tbl_lo_companies tlc ON tlc.company_id = tlb.company_id 
	LEFT JOIN test.tbl_lo_corporative_groups tlcg ON tlcg.corporative_id = tlc.corporative_id
) AS branch ON branch.old_branch_id = u.BRANCHO_ID
RIGHT JOIN laboratorio_frame.processes as p on p.PROCESSES_ID = o.PROCESSES_ID
WHERE o.ORDER_ID NOT IN (SELECT old_key FROM test.tbl_mr_orders);

INSERT INTO test.tbl_mr_results (result_file_path, exam_name, doctor_dni, doctor_fullname, doctor_signature, order_id, old_key)
SELECT 
CONCAT(
	'/usr/src/app/omega/old-ipeges/archivos',
	u.FOLDER_PATH, '/' , 
	bo.BRANCHO_ID, '-', bo.FOLDER , '/', 
	y.YEAR_NAME, '/', 
	p.PROCESSES_NAME, '/', 
	u.USER_ID, '-', u.USER_CI, '-', u.USER_NAME, ' ', u.USER_LNAME, '/', 
	LOWER(REPLACE(e.exam_name, ' ', '-')), '_', r.ORDER_ID,'_1-',u.USER_CI,'-', LOWER(REPLACE(u.USER_NAME, ' ', '_')), '_', LOWER(REPLACE(u.USER_LNAME, ' ', '_'))  , 
	'.pdf'
), 
e.exam_name, 
'0000000000', 
'Omega Salud Ocupacional', 
'',  
o.order_id,
r.RESULT_ID
FROM laboratorio_frame.results as r
RIGHT JOIN test.tbl_lab_exams AS e ON e.old_key = r.TEST_ID
RIGHT JOIN test.tbl_mr_orders AS o ON o.old_key = r.ORDER_ID
JOIN laboratorio_frame.orders old_order on old_order.ORDER_ID = r.ORDER_ID
JOIN laboratorio_frame.`user` u on u.USER_ID = r.USER_ID 
JOIN laboratorio_frame.company c on c.COMPANY_ID = u.COMPANY_ID 
JOIN laboratorio_frame.company_group cg on cg.COMPANY_GROUP_ID = c.GROUP_ID
JOIN laboratorio_frame.branchO bo on bo.BRANCHO_ID = u.BRANCHO_ID
JOIN laboratorio_frame.years y on old_order.YEAR_ID = y.YEAR_ID 
JOIN laboratorio_frame.processes p on p.PROCESSES_ID = p.PROCESSES_ID
WHERE r.RESULT_ID NOT IN (SELECT old_key FROM test.tbl_mr_results);

ALTER TABLE test.tbl_auth_api_keys DROP COLUMN old_key;
ALTER TABLE test.tbl_auth_credentials DROP COLUMN old_key;
ALTER TABLE test.tbl_auth_tokens DROP COLUMN old_key;
ALTER TABLE test.tbl_d_disease_groups DROP COLUMN old_key;
ALTER TABLE test.tbl_d_diseases DROP COLUMN old_key;
ALTER TABLE test.tbl_developer_logs DROP COLUMN old_key;
ALTER TABLE test.tbl_lab_exam_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lab_exams DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_branch_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_branches DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_cities DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_companies DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_company_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_corporative_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_lo_corporative_groups DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_medical_client DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_medical_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_order_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_orders DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_orders_email DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_reports DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_reports_send_attributes DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_result_external_key DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_result_send_attributes DROP COLUMN old_key;
ALTER TABLE test.tbl_mr_results DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_clients DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_clients_resources DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_logos DROP COLUMN old_key;
ALTER TABLE test.tbl_ow_resources DROP COLUMN old_key;
ALTER TABLE test.tbl_u_doctors DROP COLUMN old_key;
ALTER TABLE test.tbl_u_patients DROP COLUMN old_key;
ALTER TABLE test.tbl_u_user_attribute DROP COLUMN old_key;
ALTER TABLE test.tbl_u_users DROP COLUMN old_key;
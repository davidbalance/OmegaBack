-- This is an empty migration.
DROP VIEW v_d_disease_group_options;

CREATE VIEW v_d_disease_group_options AS
SELECT
	tddg.disease_group_id AS group_value,
	tddg.disease_group_name AS group_label, 
	tdd.disease_id AS disease_value, 
	tdd.disease_name AS disease_label
FROM tbl_d_disease_groups tddg
INNER JOIN tbl_d_diseases tdd ON tdd.disease_group_id = tddg.disease_group_id
WHERE tddg.is_active = 1;
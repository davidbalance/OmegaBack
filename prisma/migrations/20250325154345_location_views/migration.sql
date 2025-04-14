
DROP VIEW v_lo_corporative_groups;
CREATE VIEW v_lo_corporative_groups AS
SELECT 
	tlcg.corporative_id, 
	tlcg.corporative_name, 
	COUNT(tlc.company_id) > 0 AS company_has_companies
FROM tbl_lo_corporative_groups tlcg
LEFT JOIN tbl_lo_companies tlc ON tlc.corporative_id = tlcg.corporative_id
GROUP BY tlcg.corporative_id, 
	tlcg.corporative_name;

DROP VIEW v_lab_corporative_options;
CREATE VIEW v_lo_corporative_options AS
SELECT 
	CASE
		WHEN tlc.company_id IS NULL THEN '00000000-0000-0000-0000-000000000000' ELSE tlc.company_id 
		END AS company_value, 
	CASE
		WHEN company_ruc IS NULL THEN '0000000000-NO ESPECIFICO' ELSE CONCAT(company_ruc,'-',tlc.company_name)	
	END AS company_label,
	tlcg.corporative_id AS corporative_value, 
	tlcg.corporative_name AS corporative_label
FROM tbl_lo_corporative_groups tlcg
LEFT JOIN tbl_lo_companies tlc ON tlc.corporative_id = tlcg.corporative_id;

DROP VIEW v_lo_companies;
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
LEFT JOIN tbl_lo_branches tlb ON tlb.company_id = tlc.company_id
GROUP BY tlc.company_id, 
	tlc.company_ruc, 
	tlc.company_name, 
	tlc.company_address, 
	tlc.company_phone, 
	tlc.corporative_id;

DROP VIEW v_lab_company_options;
CREATE VIEW v_lo_company_options AS
SELECT 
	CASE
		WHEN tlb.branch_id IS NULL THEN '00000000-0000-0000-0000-000000000000' ELSE tlb.branch_id
	END AS branch_value, 
	CASE
		WHEN tlb.branch_name IS NULL THEN 'NO ESPECIFICO' ELSE tlb.branch_name
	END AS branch_label, 
	tlc.company_id AS company_value, 
	CONCAT(company_ruc,'-',tlc.company_name) AS company_label
FROM tbl_lo_companies tlc
LEFT JOIN tbl_lo_branches tlb ON tlb.company_id = tlc.company_id;
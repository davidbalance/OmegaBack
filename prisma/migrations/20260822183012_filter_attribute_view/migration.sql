-- Create View
CREATE VIEW v_u_company_filter AS
SELECT 
    tucf.company_filter_id,
    tucf.corporative_id,
    tucf.corporative_name,
    tucf.company_id,
    tucf.company_ruc,
    tucf.user_id
FROM tbl_u_company_filter tucf;

-- Create View
CREATE VIEW v_u_corporative_filter AS
SELECT 
    tucf.corporative_filter_id,
    tucf.corporative_id,
    tucf.corporative_name,
    tucf.user_id
FROM tbl_u_corporative_filter tucf;
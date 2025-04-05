-- Create View
DROP VIEW v_lab_exams;
CREATE VIEW v_lab_exams AS
SELECT exam_id, exam_name, exam_subtype_id
FROM tbl_lab_exams;

-- Create View
DROP VIEW v_lab_exam_subtypes;
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
DROP VIEW v_lab_exam_types;
CREATE VIEW v_lab_exam_types AS
SELECT 
	tlet.exam_type_id, 
	tlet.exam_type_name, 
	COUNT(tles.exam_subtype_id) > 0 AS test_has_subtypes 
FROM tbl_lab_exam_types tlet
LEFT JOIN tbl_lab_exam_subtypes tles ON tles.exam_type_id = tlet.exam_type_id
GROUP BY tlet.exam_type_id, 
	tlet.exam_type_name;

-- Create View
DROP VIEW v_lab_exam_subtype_options;
CREATE VIEW v_lab_exam_subtype_options AS
SELECT 
	CASE
		WHEN tle.exam_id IS NULL THEN '00000000-0000-0000-0000-000000000000' ELSE tle.exam_id
	END AS exam_value, 
	CASE
		WHEN tle.exam_name IS NULL THEN 'NO ESPECIFICO' ELSE tle.exam_name
	END AS exam_label, 
	tles.exam_subtype_id AS subtype_value, 
	tles.exam_subtype_name AS subtype_label
FROM tbl_lab_exam_subtypes tles
LEFT JOIN tbl_lab_exams tle ON tle.exam_subtype_id = tles.exam_subtype_id;

-- Create View
DROP VIEW v_lab_exam_type_options;
CREATE VIEW v_lab_exam_type_options AS
SELECT 
	CASE
		WHEN tles.exam_subtype_id IS NULL THEN '00000000-0000-0000-0000-000000000000' ELSE tles.exam_subtype_id
	END AS subtype_value, 
	CASE
		WHEN tles.exam_subtype_name IS NULL THEN 'NO ESPECIFICO' ELSE tles.exam_subtype_name
	END AS subtype_label, 
	tlet.exam_type_id AS type_value, 
	tlet.exam_type_name AS type_label
FROM tbl_lab_exam_types tlet
LEFT JOIN tbl_lab_exam_subtypes tles ON tles.exam_type_id = tlet.exam_type_id;
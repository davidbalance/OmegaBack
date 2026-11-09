/*
  Warnings:

  - You are about to drop the `tbl_m_reports` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tbl_m_reports` DROP FOREIGN KEY `tbl_m_reports_medical_test_id_fkey`;

-- DropTable
DROP TABLE `tbl_m_reports`;


-- Drop Views
DROP VIEW v_m_reports;
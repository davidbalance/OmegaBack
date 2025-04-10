/*
  Warnings:

  - A unique constraint covering the columns `[corporative_name]` on the table `tbl_lo_corporative_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tbl_lo_corporative_groups_corporative_name_key` ON `tbl_lo_corporative_groups`(`corporative_name`);

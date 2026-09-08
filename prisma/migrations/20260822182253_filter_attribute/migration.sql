-- CreateTable
CREATE TABLE `tbl_u_company_filter` (
    `company_filter_id` CHAR(36) NOT NULL,
    `corporative_id` CHAR(36) NOT NULL,
    `corporative_name` VARCHAR(64) NOT NULL,
    `company_id` CHAR(36) NOT NULL,
    `company_ruc` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`company_filter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_u_corporative_filter` (
    `corporative_filter_id` CHAR(36) NOT NULL,
    `corporative_id` CHAR(36) NOT NULL,
    `corporative_name` VARCHAR(64) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` CHAR(36) NOT NULL,

    PRIMARY KEY (`corporative_filter_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_u_company_filter` ADD CONSTRAINT `tbl_u_company_filter_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_u_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_u_corporative_filter` ADD CONSTRAINT `tbl_u_corporative_filter_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `tbl_u_users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
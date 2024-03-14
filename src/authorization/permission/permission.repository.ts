import { AbstractRepository } from "src/shared"
import { Permission } from "./entities/permission.entity";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class PermissionRepository extends AbstractRepository<number, Permission> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Permission) private readonly permissionModel: Repository<Permission>
    ) {
        super(permissionModel);
    }

}
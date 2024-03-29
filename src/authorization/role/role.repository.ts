import { AbstractRepository } from "src/shared";
import { Role } from "./entities/role.entity";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class RoleRepository
    extends AbstractRepository<number, Role> {

    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(Role) private readonly roleModel: Repository<Role>
    ) {
        super(roleModel);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<Role>): Promise<void> {
        await this.findOneAndUpdate(filterOptions, { status: false });
    }
}
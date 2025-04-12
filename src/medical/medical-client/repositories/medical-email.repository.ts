import { AbstractRepository } from "@/shared/sql-database";
import { Injectable, Logger } from "@nestjs/common";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicalEmail } from "../entities/medical-email.entity";

@Injectable()
export class MedicalEmailRepository extends AbstractRepository<number, MedicalEmail> {

    protected logger: Logger;

    constructor(
        @InjectRepository(MedicalEmail) private readonly repo: Repository<MedicalEmail>
    ) {
        super(repo);
    }

    async findOneAndDelete(filterOptions: FindOptionsWhere<MedicalEmail>): Promise<void> {
        await this.repo.delete(filterOptions);
    }
}
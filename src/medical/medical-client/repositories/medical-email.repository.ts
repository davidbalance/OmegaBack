import { AbstractRepository } from "@/shared";
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

    findOneAndDelete(filterOptions: FindOptionsWhere<MedicalEmail>): void | Promise<void> {
        this.repo.delete(filterOptions);
    }
}
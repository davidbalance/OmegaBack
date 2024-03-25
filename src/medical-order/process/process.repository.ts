import { AbstractRepository } from "@/shared";
import { Process } from "./entities/process.entity";
import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class ProcessRepository extends AbstractRepository<number, Process> {
    protected logger: Logger = new Logger();
    constructor(
        @InjectRepository(Process) private readonly processModel: Repository<Process>
    ) {
        super(processModel);
    }
}
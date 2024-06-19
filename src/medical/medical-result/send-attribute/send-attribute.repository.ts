import { AbstractRepository } from "@/shared";
import { Injectable, Logger } from "@nestjs/common";
import { SendAttribute } from "./entities/send-attribute.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SendAttributeRepository extends AbstractRepository<number, SendAttribute> {
    protected logger: Logger = new Logger();

    constructor(
        @InjectRepository(SendAttribute) private readonly attributeModel: Repository<SendAttribute>
    ) {
        super(attributeModel);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findOneAndDelete(_filterOptions: FindOptionsWhere<SendAttribute>): void | Promise<void> {
        throw new Error("Method not implemented.");
    }
}
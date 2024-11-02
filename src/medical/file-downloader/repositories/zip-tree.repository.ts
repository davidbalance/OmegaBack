import { AbstractRepository } from "@/shared/sql-database/abstract.repository";
import { Injectable } from "@nestjs/common";
import { ZipTree } from "../entities/zip-tree.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ZipTreeRepository extends AbstractRepository<number, ZipTree> {

    constructor(
        @InjectRepository(ZipTree) model: Repository<ZipTree>
    ) {
        super(model);
    }
}
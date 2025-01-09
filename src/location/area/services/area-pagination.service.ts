import { Injectable, Inject } from "@nestjs/common";
import { AreaRepository } from "../repositories/area.repository";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { SelectQueryBuilder } from "typeorm";
import { AreaEntity } from "../entities/area.entity";
import { Area } from "../dtos/response/area.base.dto";

@Injectable()
export class AreaPaginationService extends BasePaginationService<AreaEntity, Area> {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
  ) { super(); }

  protected queryBuilder(filter: string, _?: any | undefined): SelectQueryBuilder<AreaEntity> {
    return this.repository.query('area')
      .select('area.id', 'id')
      .addSelect('area.name', 'name')
      .where('area.name LIKE :name', { name: `%${filter}%` })
  }
}

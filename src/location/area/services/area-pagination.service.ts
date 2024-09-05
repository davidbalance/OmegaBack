import { Injectable, Inject } from "@nestjs/common";
import { Area } from "../entities/area.entity";
import { AreaRepository } from "../repositories/area.repository";
import { AreaResponseDto } from "../dtos/response/base.area.response.dto";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { SelectQueryBuilder } from "typeorm";

@Injectable()
export class AreaPaginationService extends BasePaginationService<Area, AreaResponseDto> {

  constructor(
    @Inject(AreaRepository) private readonly repository: AreaRepository,
  ) { super(); }

  protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<Area> {
    return this.repository.query('area')
      .innerJoin('area.management', 'management', 'management.id = :management', { management: extras })
      .select('area.id', 'id')
      .addSelect('area.name', 'name')
      .where('area.name LIKE :name', { name: `%${filter}%` })
  }
}

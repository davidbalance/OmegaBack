import { Injectable, Inject, Provider, Logger } from "@nestjs/common";
import { LogoRepository } from "@omega/auth/application/repository/logo/model.repositories";
import { LogoModel } from "@omega/auth/core/model/logo/logo.model";
import { Prisma } from "@prisma/client";
import { SearchCriteria, FilterGroup, Filter } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { LogoModelMapper } from "../../../mapper/auth/model/logo.model-mapper";
import { PrismaService } from "../../../prisma.service";
import { LogoModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class LogoModelPrismaRepository implements LogoRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<LogoModel>): Promise<LogoModel[]> {
        try {
            const where = PrismaFilterMapper.map<LogoModel, Prisma.LogoModelWhereInput>(filter.filter);
            const values = await this.prisma.logoModel.findMany({ where });
            return values.map(e => LogoModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<LogoModel> | Filter<LogoModel>)[]): Promise<LogoModel | null> {
        try {
            const where = PrismaFilterMapper.map<LogoModel, Prisma.LogoModelWhereInput>(filter);
            const value = await this.prisma.logoModel.findFirst({ where });
            return value ? LogoModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const LogoModelRepositoryProvider: Provider = {
    provide: LogoModelRepositoryToken,
    useClass: LogoModelPrismaRepository,
}
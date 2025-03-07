import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DoctorOptionRepository } from "@omega/profile/application/repository/model.repositories";
import { DoctorOptionModel } from "@omega/profile/core/model/user/doctor-option.model";
import { DoctorOptionModelMapper } from "../../../mapper/profile/model/doctor-option,model-mapper";
import { DoctorOptionModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DoctorOptionPrismaRepository implements DoctorOptionRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findManyAsync(filter: SearchCriteria<DoctorOptionModel>): Promise<DoctorOptionModel[]> {
        try {
            const where = PrismaFilterMapper.map<DoctorOptionModel, Prisma.DoctorOptionModelWhereInput>(filter.filter);
            const values = await this.prisma.doctorOptionModel.findMany({ where });
            return values.map(e => DoctorOptionModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DoctorOptionModel> | Filter<DoctorOptionModel>)[]): Promise<DoctorOptionModel | null> {
        try {
            const where = PrismaFilterMapper.map<DoctorOptionModel, Prisma.DoctorOptionModelWhereInput>(filter);
            const value = await this.prisma.doctorOptionModel.findFirst({ where });
            return value ? DoctorOptionModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DoctorOptionModelRepositoryProvider: Provider = {
    provide: DoctorOptionModelRepositoryToken,
    useClass: DoctorOptionPrismaRepository,
}
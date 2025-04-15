import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { DoctorModelMapper } from "../../../mapper/profile/model/doctor.model-mapper";
import { DoctorModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class DoctorPrismaRepository implements DoctorRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<DoctorModel> | FilterGroup<DoctorModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<DoctorModel, Prisma.DoctorModelWhereInput>(filter);
            const value = await this.prisma.doctorModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<DoctorModel>): Promise<DoctorModel[]> {
        try {
            const where = PrismaFilterMapper.map<DoctorModel, Prisma.DoctorModelWhereInput>(filter.filter);
            const values = await this.prisma.doctorModel.findMany({ where });
            return values.map(e => DoctorModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<DoctorModel> | Filter<DoctorModel>)[]): Promise<DoctorModel | null> {
        try {
            const where = PrismaFilterMapper.map<DoctorModel, Prisma.DoctorModelWhereInput>(filter);
            const value = await this.prisma.doctorModel.findFirst({ where });
            return value ? DoctorModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const DoctorModelRepositoryProvider: Provider = {
    provide: DoctorModelRepositoryToken,
    useClass: DoctorPrismaRepository,
}
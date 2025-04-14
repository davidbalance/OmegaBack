import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientDoctorRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";
import { ClientDoctorModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { ClientDoctorModelMapper } from "../../../mapper/medical/model/client_doctor.model_mapper";

@Injectable()
export class ClientPrismaRepository implements ClientDoctorRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<ClientDoctorModel> | FilterGroup<ClientDoctorModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<ClientDoctorModel, Prisma.ClientDoctorModelWhereInput>(filter);
            const value = await this.prisma.clientDoctorModel.count({ where });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<ClientDoctorModel>): Promise<ClientDoctorModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientDoctorModel, Prisma.ClientDoctorModelWhereInput>(filter.filter);
            const values = await this.prisma.clientDoctorModel.findMany({
                where,
                orderBy: filter.order,
                skip: (filter?.skip ?? 0) * (filter?.limit ?? 1),
                take: filter.limit
            });
            return values.map(e => ClientDoctorModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientDoctorModel> | Filter<ClientDoctorModel>)[]): Promise<ClientDoctorModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientDoctorModel, Prisma.ClientDoctorModelWhereInput>(filter);
            const value = await this.prisma.clientDoctorModel.findFirst({ where });
            return value ? ClientDoctorModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientDoctorModelRepositoryProvider: Provider = {
    provide: ClientDoctorModelRepositoryToken,
    useClass: ClientPrismaRepository,
}
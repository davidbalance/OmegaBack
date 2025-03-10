import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { Filter, FilterGroup, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientModelMapper } from "../../../mapper/medical/model/client.model-mapper";
import { ClientModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";

@Injectable()
export class ClientPrismaRepository implements ClientRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async countAsync(filter: (Filter<ClientModel> | FilterGroup<ClientModel>)[]): Promise<number> {
        try {
            const where = PrismaFilterMapper.map<ClientModel, Prisma.ClientModelWhereInput>(filter);
            const value = await this.prisma.clientModel.count({
                where,
            });
            return value;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findManyAsync(filter: SearchCriteria<ClientModel>): Promise<ClientModel[]> {
        try {
            const where = PrismaFilterMapper.map<ClientModel, Prisma.ClientModelWhereInput>(filter.filter);
            const values = await this.prisma.clientModel.findMany({
                where,
                select: {
                    patientId: true,
                    patientDni: true,
                    patientName: true,
                    patientLastname: true,
                    patientBirthday: true,
                    patientGender: true,
                    patientRole: true,
                },
                orderBy: filter.order,
                skip: filter.skip,
                take: filter.limit,
                distinct: ['patientId', 'patientDni', 'patientName', 'patientLastname', 'patientBirthday', 'patientGender', 'patientRole']
            });
            return values.map(e => ClientModelMapper.toModel(e));
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async findOneAsync(filter: (FilterGroup<ClientModel> | Filter<ClientModel>)[]): Promise<ClientModel | null> {
        try {
            const where = PrismaFilterMapper.map<ClientModel, Prisma.ClientModelWhereInput>(filter);
            const value = await this.prisma.clientModel.findFirst({ where });
            return value ? ClientModelMapper.toModel(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const ClientModelRepositoryProvider: Provider = {
    provide: ClientModelRepositoryToken,
    useClass: ClientPrismaRepository,
}
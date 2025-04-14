import { Inject, Injectable, Logger, Provider } from "@nestjs/common";
import { PrismaService } from "../../../prisma.service";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaFilterMapper } from "../../../filter-mapper";
import { Prisma } from "@prisma/client";
import { CorporativeRepository } from "@omega/location/application/repository/aggregate.repositories";
import { CorporativeProps, Corporative } from "@omega/location/core/domain/corporative/corporative.domain";
import { CorporativeCompanyMovedEventPayload, CorporativeCompanyRemovedEventPayload, CorporativeIsEvent, CorporativeRemovedEventPayload } from "@omega/location/core/domain/corporative/events/corporative.events";
import { CorporativeDomainMapper } from "../../../mapper/location/domain/corporative.domain-mapper";
import { CompanyDomainMapper } from "../../../mapper/location/domain/company.domain-mapper";
import { Company } from "@omega/location/core/domain/corporative/company.domain";
import { CompanyBranchMovedEventPayload, CompanyBranchRemovedEventPayload, CompanyIsEvent } from "@omega/location/core/domain/corporative/events/company.events";
import { BranchDomainMapper } from "../../../mapper/location/domain/branch.domain-mapper";
import { Branch } from "@omega/location/core/domain/corporative/branch.domain";
import { CorporativeAggregateRepositoryToken } from "@omega/location/nest/inject/aggregate-repository.inject";
import { RepositoryError } from "@shared/shared/domain/error";
import { BranchIsEvent } from "@omega/location/core/domain/corporative/events/branch.events";
import { CorporativeExternalKeyProps } from "@omega/location/core/domain/corporative/value_objects/corporative-external-key.value-object";
import { CompanyExternalKeyProps } from "@omega/location/core/domain/corporative/value_objects/company-external-key.value-object";
import { BranchExternalKeyProps } from "@omega/location/core/domain/corporative/value_objects/branch-external-key.value-object";

@Injectable()
export class CorporativePrismaRepository implements CorporativeRepository {
    constructor(
        @Inject(PrismaService) private readonly prisma: PrismaService
    ) { }

    async findOneAsync(filter: SearchCriteria<CorporativeProps>): Promise<Corporative | null> {
        try {
            const where = PrismaFilterMapper.map<CorporativeProps, Prisma.CorporativeGroupWhereInput>(filter.filter);
            const value = await this.prisma.corporativeGroup.findFirst({
                include: {
                    externalKeys: true,
                    companies: {
                        include: {
                            branches: { include: { externalKeys: true } },
                            externalKeys: true
                        }
                    }
                },
                where: where
            });
            return value ? CorporativeDomainMapper.toDomain(value) : null;
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async saveAsync(aggregate: Corporative): Promise<void> {
        const events = aggregate.uncommitted();
        for (const event of events) {
            if (AggregateEvent.isAggregatedCreatedEvent<Corporative>(event))
                await this.createCorporative(aggregate);

            else if (CorporativeIsEvent.isCorporativeRemovedEvent(event))
                await this.removeCorporative(event.value);

            else if (CorporativeIsEvent.isCorporativeCompanyAddedEvent(event))
                await this.addCompany(event.value);

            else if (CorporativeIsEvent.isCorporativeCompanyRemovedEvent(event))
                await this.removeCompany(event.value);

            else if (CorporativeIsEvent.isCorporativeCompanyMovedEvent(event))
                await this.moveCompany(event.value);

            else if (CorporativeIsEvent.isCorporativeExternalKeyAddedEvent(event))
                await this.addCorporativeExternalKey(event.value);

            else if (CompanyIsEvent.isCompanyBranchAddedEvent(event))
                await this.addBranch(event.value);

            else if (CompanyIsEvent.isCompanyBranchRemovedEvent(event))
                await this.removeBranch(event.value);

            else if (CompanyIsEvent.isCompanyBranchMovedEvent(event))
                await this.moveBranch(event.value);

            else if (CompanyIsEvent.isCompanyExternalKeyAddedEvent(event))
                await this.addCompanyExternalKey(event.value);

            else if (BranchIsEvent.isBranchExternalKeyAddedEvent(event))
                await this.addBranchExternalKey(event.value);
        }
    }

    async createCorporative(value: Corporative): Promise<void> {
        try {
            const data = CorporativeDomainMapper.toPrisma(value);
            await this.prisma.corporativeGroup.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeCorporative(value: CorporativeRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.corporativeGroup.update({
                where: { id: value.corporativeId },
                data: { isActive: false }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addCorporativeExternalKey(value: CorporativeExternalKeyProps): Promise<void> {
        try {
            await this.prisma.corporativeExternalKey.create({
                data: { owner: value.owner, value: value.value, corporativeId: value.corporativeId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addCompany(value: Company): Promise<void> {
        try {
            const data = CompanyDomainMapper.toPrisma(value);
            await this.prisma.company.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeCompany(value: CorporativeCompanyRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.company.delete({ where: { id: value.companyId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async moveCompany(value: CorporativeCompanyMovedEventPayload): Promise<void> {
        try {
            await this.prisma.company.update({ where: { id: value.companyId }, data: { corporativeId: value.toCorporativeId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addCompanyExternalKey(value: CompanyExternalKeyProps): Promise<void> {
        try {
            await this.prisma.companyExternalKey.create({
                data: { owner: value.owner, value: value.value, companyId: value.companyId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addBranch(value: Branch): Promise<void> {
        try {
            const data = BranchDomainMapper.toPrisma(value);
            await this.prisma.branch.create({ data });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async removeBranch(value: CompanyBranchRemovedEventPayload): Promise<void> {
        try {
            await this.prisma.branch.delete({ where: { id: value.branchId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async moveBranch(value: CompanyBranchMovedEventPayload): Promise<void> {
        try {
            await this.prisma.branch.update({ where: { id: value.branchId }, data: { companyId: value.toCompanyId } });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }

    async addBranchExternalKey(value: BranchExternalKeyProps): Promise<void> {
        try {
            await this.prisma.branchExternalKey.create({
                data: { owner: value.owner, value: value.value, branchId: value.branchId }
            });
        } catch (error) {
            Logger.error(error);
            throw new RepositoryError();
        }
    }
}

export const CorporativeAggregateRepositoryProvider: Provider = {
    provide: CorporativeAggregateRepositoryToken,
    useClass: CorporativePrismaRepository,
}
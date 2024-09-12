import { Inject, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { Brackets, SelectQueryBuilder } from "typeorm";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";
import { UserEntity } from "../entities/user.entity";
import { User } from "../dtos/response/user.base.dto";

@Injectable()
export class UserPaginationService extends BasePaginationService<UserEntity, User> {

    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
    ) { super(); }

    protected queryBuilder(filter: string, extras?: any | undefined): SelectQueryBuilder<UserEntity> {
        return this.repository.query('user')
            .select('user.id', 'id')
            .addSelect('user.dni', 'dni')
            .addSelect('user.email', 'email')
            .addSelect('user.name', 'name')
            .addSelect('user.lastname', 'lastname')
            .addSelect('user.hasCredential', 'hasCredential')
            .where(new Brackets(qr =>
                qr.where('user.dni LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('user.email LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('user.name LIKE :filter', { filter: `%${filter}%` })
                    .orWhere('user.lastname LIKE :filter', { filter: `%${filter}%` })
            ))
            .andWhere('user.status = :status', { status: true })
            .andWhere('user.hasCredential = :hasCredential', { hasCredential: true })
            .andWhere('user.id != :id', { id: extras });
    }
}
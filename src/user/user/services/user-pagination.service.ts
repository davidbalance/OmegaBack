import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserEventService } from "./user-event.service";
import { User } from "../entities/user.entity";
import { Brackets, Not, SelectQueryBuilder } from "typeorm";
import { PostUserRequestDto } from "../dtos/request/post.user.request.dto";
import { UserExtraAttributeService } from "./user-extra-attributes.service";
import { UserResponseDto } from "../dtos/response/base.user.response.dto";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";

@Injectable()
export class UserPaginationService extends BasePaginationService<User, UserResponseDto> {

    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
    ) { super(); }

    protected queryBuilder(filter: string, extras: number): SelectQueryBuilder<User> {
        console.log(filter, extras);
        return this.repository.query('user')
            .select('user.id', 'user')
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
            .andWhere('user.id != :id', { id: extras })
    }
}
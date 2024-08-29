import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserEventService } from "./user-event.service";
import { User } from "../entities/user.entity";
import { Not } from "typeorm";
import { PostUserRequestDto } from "../dtos/request/post.user.request.dto";
import { UserExtraAttributeService } from "./user-extra-attributes.service";

@Injectable()
export class UserManagementService {
    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
        @Inject(UserEventService) private readonly eventService: UserEventService,
        @Inject(UserExtraAttributeService) private readonly attributeService: UserExtraAttributeService
    ) { }

    async create({ dni, email, role, ...data }: PostUserRequestDto): Promise<User> {
        try {
            await this.repository.findOne({
                where: [{ dni: dni }, { email: email }]
            });
            const conflictMessage = ['DNI or Email already un use', JSON.stringify({ dni, email })];
            throw new ConflictException(conflictMessage);
        } catch (error) {
            if (error instanceof NotFoundException) {
                const dniType: string = dni.length < 10 ? 'pas' : 'dni';
                const newUser = await this.repository.create({ dni, email, dniType, ...data });
                if (role) {
                    this.attributeService.assignAttribute(newUser.id, { name: 'role', value: role });
                }
                return newUser;
            }
            throw error;
        }
    }

    async find(not: number = -1): Promise<User[]> {
        return this.repository.find({
            where: { status: true, hasCredential: true, id: Not(not) },
            select: { id: true, dni: true, email: true, name: true, lastname: true },
            cache: 1000 * 900
        });
    }

    async findOne(id: number): Promise<User> {
        return this.repository.findOne({
            where: { id: id },
            relations: { extraAttributes: true }
        });
    }

    async findOneByDni(dni: string): Promise<User> {
        return this.repository.findOne({
            where: { dni: dni },
            relations: { extraAttributes: true }
        });
    }

    async updateOne(id: number, user: Partial<User>): Promise<User> {
        const updateUser = await this.repository.findOneAndUpdate({ id }, user);
        return updateUser;
    }

    async deleteOne(id: number): Promise<void> {
        await this.repository.findOneAndDelete({ id: id });
        this.eventService.emitUserDeleteEvent(id);
    }
}
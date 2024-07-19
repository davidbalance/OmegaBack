import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserEventService } from "./user-event.service";
import { User } from "../entities/user.entity";
import { Not } from "typeorm";
import { POSTUserRequestDto } from "../dtos/post.user-management.dto";

@Injectable()
export class UserManagementService {
    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
        @Inject(UserEventService) private readonly eventService: UserEventService
    ) { }

    async create({ dni, email, ...data }: POSTUserRequestDto): Promise<User> {
        try {
            await this.repository.findOne({
                where: [{ dni: dni }, { email: email }]
            });
            const conflictMessage = ['DNI or Email already un use', JSON.stringify({ dni, email })];
            throw new ConflictException(conflictMessage);
        } catch (error) {
            if (error instanceof NotFoundException) {
                const newUser = await this.repository.create({ dni, email, ...data });
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
        this.eventService.emitUserUpdateEvent(id, user.email);
        return updateUser;
    }

    async deleteOne(id: number): Promise<void> {
        await this.repository.findOneAndDelete({ id: id });
        this.eventService.emitUserDeleteEvent(id);
    }
}
import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CreateUserRequestDTO, FindOneUserAndUpdateRequestDTO } from '../common';
import { CredentialEvent, UserCreateEvent, UserEvent, UserRemoveEvent, UserUpdateEvent } from '@/shared';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  async create({ dni, email, ...data }: CreateUserRequestDTO): Promise<User> {
    try {
      await this.repository.findOne({ where: [{ dni: dni }, { email: email }] });
      const conflictMessage = ['DNI or Email already un use', JSON.stringify({ dni, email })];
      Logger.warn(conflictMessage);
      throw new ConflictException(conflictMessage);
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = await this.repository.create({ dni, email, ...data });
        this.eventEmitter.emit(UserEvent.CREATE, new UserCreateEvent({ ...newUser }));
        return newUser;
      }
      throw error;
    }
  }

  async find(): Promise<User[]> {
    return this.repository.find({
      where: {
        status: true,
        hasCredential: true
      },
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastname: true
      }
    });
  }

  @OnEvent(CredentialEvent.CREATE)
  async assignCredential(id: number): Promise<void> {
    this.repository.findOneAndUpdate({ id }, { hasCredential: true });
  }

  @OnEvent(CredentialEvent.REMOVE)
  async removeCredential(id: number): Promise<void> {
    this.repository.findOneAndUpdate({ id }, { hasCredential: false });
  }

  async findOneAndUpdate(id: number, user: FindOneUserAndUpdateRequestDTO): Promise<User> {
    const updateUser = await this.repository.findOneAndUpdate({ id }, user);
    this.eventEmitter.emit(UserEvent.UPDATE, new UserUpdateEvent({ id, email: user.email }));
    return updateUser;
  }

  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
    this.eventEmitter.emit(UserEvent.REMOVE, new UserRemoveEvent({ id }));
  }
}

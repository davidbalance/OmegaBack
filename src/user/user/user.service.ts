import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserRequestDTO, FindOneUserAndUpdateRequestDTO } from '../common';
import { UserEvent, UserRemoveEvent, UserUpdateEvent } from '@/shared';
import { Not } from 'typeorm';
import { UserExtraAttributeRepository } from './repositories/user-extra-attribute.repository';
import { UserExtraAttributeService } from './services/user-extra-attributes.service';
import { UserExtraAttribute } from './entities/user-extra-attribute';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
    @Inject(UserExtraAttributeService) private readonly extraAttribute: UserExtraAttributeService,
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
        return newUser;
      }
      throw error;
    }
  }

  async find(not: number = -1): Promise<User[]> {
    return this.repository.find({
      where: {
        status: true,
        hasCredential: true,
        id: Not(not)
      },
      select: {
        id: true,
        dni: true,
        email: true,
        name: true,
        lastname: true
      },
      cache: 1000 * 900
    });
  }

  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id: id }, relations: { extraAttributes: true } });
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

  async findExtraAttribute(id: number, name: string): Promise<UserExtraAttribute> {
    const user = await this.repository.findOne({ where: { id }, relations: { extraAttributes: true } });
    console.log(user);
    const extra = user.extraAttributes.find((e) => e.name === name);
    return extra;
  }

  async assignExtraAttribute(id: number, { name, value }: { name: string, value: any }): Promise<void> {
    const user = await this.repository.findOne({ where: { id }, relations: { extraAttributes: true } });
    const selectedAttribute = user.extraAttributes.find((e) => e.name === name);
    if (selectedAttribute) {
      this.extraAttribute.update(selectedAttribute.id, value);
    } else {
      const newAttribute = await this.extraAttribute.create(name, JSON.stringify(value));
      this.repository.findOneAndUpdate({ id }, { extraAttributes: [...user.extraAttributes, newAttribute] });
    }
  }
}

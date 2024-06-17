import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserRequestDTO, FindOneUserAndUpdateRequestDTO } from '../common';
import { UserEvent, UserRemoveEvent, UserUpdateEvent } from '@/shared';
import { Not } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
    @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
  ) { }

  /**
   * Creates a user with the given options
   * @param param0 
   * @returns User
   */
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

  /**
   * Find all users that have credentials and are active
   * @returns Array of User
   */
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

  /**
   * Find one user by it id
   * @param id 
   * @returns User
   */
  async findOne(id: number): Promise<User> {
    return this.repository.findOne({ where: { id: id }, relations: { extraAttributes: true } });
  }

  /**
   * Find one user and update with the given values
   * @param id 
   * @param user 
   * @returns User
   */
  async findOneAndUpdate(id: number, user: FindOneUserAndUpdateRequestDTO): Promise<User> {
    const updateUser = await this.repository.findOneAndUpdate({ id }, user);
    this.eventEmitter.emit(UserEvent.UPDATE, new UserUpdateEvent({ id, email: user.email }));
    return updateUser;
  }

  /**
   * Change the user status to inactive
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
    this.eventEmitter.emit(UserEvent.REMOVE, new UserRemoveEvent({ id }));
  }
}

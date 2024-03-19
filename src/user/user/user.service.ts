import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserRequestDTO, UpdateUserDNIRequestDTO, UpdateUserRequestDTO } from 'src/shared/dtos';
import { IServiceCheckAvailability } from '@/shared';

@Injectable()
export class UserService
  implements IServiceCheckAvailability<string> {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository
  ) { }

  async checkAvailability(key: string): Promise<boolean> {
    const user = await this.repository.findOne({ dni: key });
    return user.status;
  }

  async create(user: CreateUserRequestDTO): Promise<User> {
    try {
      await this.repository.findOne([{ dni: user.dni }, { email: user.email }]);
      Logger.warn('DNI or Email already un use', JSON.stringify({ email: user.email, dni: user.dni }));
      throw new ConflictException('DNI or Email already un use', JSON.stringify({ email: user.email, dni: user.dni }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        return this.repository.create(user);
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({ status: true });
  }

  async findOneByID(id: number): Promise<User> {
    return this.repository.findOne({ id, status: true });
  }

  async findOneByDNI(dni: string): Promise<User> {
    return this.repository.findOne({ dni, status: true });
  }

  async update(id: number, user: UpdateUserRequestDTO): Promise<User> {
    return this.repository.findOneAndUpdate({ id }, user);
  }

  async updateDNI(id: number, user: UpdateUserDNIRequestDTO): Promise<User> {
    try {
      await this.repository.findOne({ dni: user.dni });
      throw new ConflictException(["DNI already in use"]);
    } catch (error) {
      return this.repository.findOneAndUpdate({ id, status: true }, user);
    }
  }

  async inactive(id: number): Promise<User> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}

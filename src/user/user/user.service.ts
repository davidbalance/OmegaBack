import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserRequestDTO, UpdateUserRequestDTO } from 'src/shared/dtos';

type FindUserParams = Omit<User, 'id' | 'status' | 'createAt' | 'updateAt'>;

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository
  ) { }

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

  async find(params?: Partial<FindUserParams>): Promise<User[]> {
    return this.repository.find({ ...params, status: true });
  }

  async findOne(params?: Partial<FindUserParams & { id?: number }>): Promise<User> {
    return this.repository.findOne({ ...params, status: true });
  }

  async update(id: number, user: UpdateUserRequestDTO): Promise<User> {
    return this.repository.findOneAndUpdate({ id }, user);
  }

  async inactive(id: number): Promise<User> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }

  async checkExistence(params: FindUserParams): Promise<boolean> {
    return !!(await this.repository.findOne(params));
  }
}

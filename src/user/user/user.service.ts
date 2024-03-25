import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { CreateUserRequestDTO, UpdateUserRequestDTO } from 'src/shared/dtos';
import { WebClientService } from '@/omega-web/web-client/web-client.service';

type FindUserParams = Omit<User, 'id' | 'status' | 'createAt' | 'updateAt'>;

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository,
    @Inject(WebClientService) private readonly webClientService: WebClientService
  ) { }

  async create(user: CreateUserRequestDTO): Promise<User> {
    try {
      await this.repository.findOne([{ dni: user.dni }, { email: user.email }]);
      Logger.warn('DNI or Email already un use', JSON.stringify({ email: user.email, dni: user.dni }));
      throw new ConflictException('DNI or Email already un use', JSON.stringify({ email: user.email, dni: user.dni }));
    } catch (error) {
      if (error instanceof NotFoundException) {
        const newUser = await this.repository.create(user);
        await this.webClientService.create({ user: newUser.id });
        return newUser;
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

  async findOneAndUpdate(id: number, user: UpdateUserRequestDTO): Promise<User> {
    return this.repository.findOneAndUpdate({ id }, user);
  }

  async findOneAndInactive(id: number): Promise<User> {
    return await this.repository.findOneAndUpdateStatus(id, false);
  }
}

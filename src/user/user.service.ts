import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @Inject(UserRepository) private readonly repository: UserRepository
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.repository.create(createUserDto);
  }

  async readAll(): Promise<User[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.repository.findOneAndUpdate({ id }, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}

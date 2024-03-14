import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCredentialDto } from './dto/create-user-credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user-credential.dto';
import { UserCredentialRepository } from './user-credential.repository';
import { UserCredential } from './entities/user-credential.entity';

@Injectable()
export class UserCredentialService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository
  ) { }

  async create(createUserCredentialDto: CreateUserCredentialDto): Promise<UserCredential> {
    return await this.repository.create(createUserCredentialDto);
  }

  async readAll(): Promise<UserCredential[]> {
    return await this.repository.find({});
  }

  async readOneByID(id: number): Promise<UserCredential> {
    return await this.repository.findOne({ id });
  }

  async update(id: number, updateUserCredentialDto: UpdateUserCredentialDto): Promise<UserCredential> {
    return await this.repository.findOneAndUpdate({ id }, updateUserCredentialDto);
  }

  async remove(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}

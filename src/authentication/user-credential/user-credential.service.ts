import { Injectable } from '@nestjs/common';
import { CreateUserCredentialDto } from './dto/create-user-credential.dto';
import { UpdateUserCredentialDto } from './dto/update-user-credential.dto';

@Injectable()
export class UserCredentialService {
  create(createUserCredentialDto: CreateUserCredentialDto) {
    return 'This action adds a new userCredential';
  }

  findAll() {
    return `This action returns all userCredential`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCredential`;
  }

  update(id: number, updateUserCredentialDto: UpdateUserCredentialDto) {
    return `This action updates a #${id} userCredential`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCredential`;
  }
}

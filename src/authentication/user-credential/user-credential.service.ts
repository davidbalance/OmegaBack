import { ConflictException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserCredentialRepository } from './user-credential.repository';
import { UserCredential } from './entities/user-credential.entity';
import { CreateUserCredentialRequestDTO, CreateUserRequestDTO } from 'src/shared/dtos';
import { UserService } from 'src/user/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCredentialService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async create(credentials: CreateUserCredentialRequestDTO, user: number): Promise<UserCredential> {
    const retriveUser = await this.userService.findOne({ id: user });
    try {
      await this.repository.findOne({ email: credentials.email });
      Logger.error(`Email already in use: ${credentials.email}`);
      throw new ConflictException("Email already in use")
    } catch (error) {
      const hashedPassword = this.hashPassword(credentials.password);
      const credential: UserCredential = await this.repository.create({
        ...credentials,
        password: hashedPassword,
        user: retriveUser
      });
      return credential;
    }
  }

  async findByUser(user: number): Promise<UserCredential> {
    const credentials = await this.repository.findOne({ user: { id: user } });
    return credentials;
  }

  async updateUsername(id: number, username: string): Promise<UserCredential> {
    const credentials = await this.repository.findOneAndUpdate({ id }, { email: username });
    return credentials;
  }

  async updatePassword(username: string, password: string): Promise<UserCredential> {
    const hashedPassword = this.hashPassword(password);
    const credentials = await this.repository.findOneAndUpdate({ email: username }, { password: hashedPassword });
    return credentials;
  }

  async validateCredentials(username: string, password: string): Promise<number> {
    const credentials = await this.repository.findOne({ email: username }, { user: true });
    if (!credentials.user.status) throw new UnauthorizedException(["Check with support"]);
    const passwordIsValid = this.validatePassword(password, credentials.password);
    if (!passwordIsValid) throw new UnauthorizedException(["Wrong credentials"]);
    return credentials.user.id;
  }

  private validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private hashPassword(password: string): string {
    const saltOrRounds = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, saltOrRounds);
  }
}

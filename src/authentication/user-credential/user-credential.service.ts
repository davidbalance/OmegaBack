import { ConflictException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserCredentialRepository } from './user-credential.repository';
import { UserCredential } from './entities/user-credential.entity';
import { CreateUserCredentialRequestDTO, CreateUserRequestDTO } from 'src/shared/dtos';
import { UserService } from 'src/user/user/user.service';
import * as bcrypt from 'bcrypt';

interface UserCredentialServiceExtension {
  /**
   * Creates credentials by given values
   * @param credentials 
   * @param user Users primary key that must be related with this credentials
   * @throws ConflictException
   */
  create(credentials: CreateUserCredentialRequestDTO, user: number): Promise<UserCredential>;
  /**
   * Creates credentials by given values
   * @param credentials 
   * @param user Users information to create
   * @throws ConflictException
   */
  create(credentials: CreateUserCredentialRequestDTO, user: CreateUserRequestDTO): Promise<UserCredential>;
  /**
   * Finds a credential that matches with the given key
   * @param user Foreign key
   */
  readByUser(user: number): Promise<UserCredential>;
  /**
   * Updates the user by the given id
   * @param id 
   * @param username 
   */
  updateUsername(id: number, username: string): Promise<UserCredential>;
  /**
   * Find one user by its username and updates its password
   * @param username 
   * @param password 
   */
  updatePassword(username: string, password: string): Promise<UserCredential>;
  /**
   * Check if the given username and password matches on in the database
   * @param username 
   * @param password 
   */
  validateCredentials(username: string, password: string): Promise<number>;
}

@Injectable()
export class UserCredentialService implements UserCredentialServiceExtension {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  create(credentials: CreateUserCredentialRequestDTO, user: number): Promise<UserCredential>;
  create(credentials: CreateUserCredentialRequestDTO, user: CreateUserRequestDTO): Promise<UserCredential>;
  async create(credentials: CreateUserCredentialRequestDTO, numberOrUser: number | CreateUserRequestDTO): Promise<UserCredential> {
    let user: CreateUserRequestDTO;
    if (typeof numberOrUser === 'number') {
      user = await this.userService.readOneByID(numberOrUser);
    } else {
      user = await this.userService.create(numberOrUser);
    }
    try {
      await this.repository.findOne({ email: credentials.email });
      Logger.error(`Email already in use: ${credentials.email}`);
      throw new ConflictException("Email already in use")
    } catch (error) {
      const hashedPassword = this.hashPassword(credentials.password);
      const credential: UserCredential = await this.repository.create({
        ...credentials,
        password: hashedPassword,
        user: user
      });
      return credential;
    }
  }

  async readByUser(user: number): Promise<UserCredential> {
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

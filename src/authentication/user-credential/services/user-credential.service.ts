import { Injectable, Inject, ConflictException, ForbiddenException } from "@nestjs/common";
import { UserCredential } from "../entities/user-credential.entity";
import { UserCredentialRepository } from "../repositories/user-credential.repository";
import { PostCredentialRequestDto } from "../dtos/request/post.user-credential.request.dto";
import bcrypt from "bcrypt"
import { UserCredentialEventService } from "./user-credential-event.service";
import { UserCredentialValidatorService } from "./user-credential-validator.service";

@Injectable()
export class UserCredentialService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository,
    @Inject(UserCredentialEventService) private readonly eventService: UserCredentialEventService,
  ) { }

  async create({ email, ...data }: PostCredentialRequestDto): Promise<UserCredential> {
    try {
      await this.repository.findOne({ where: { email } });
      const conflictMessage = ['Email already', JSON.stringify({ email })];
      throw new ConflictException(conflictMessage);
    } catch (error) {
      const hashedPassword = this.hashPassword(data.password);
      const credential: UserCredential = await this.repository.create({ ...data, password: hashedPassword, email: email });
      this.eventService.emitCredentialCreateEvent(credential.id);
      return credential;
    }
  }

  async findOneByUser(user: number): Promise<UserCredential> {
    return this.repository.findOne({ where: { user: user } });
  }

  async updatePassword(username: string, password: string): Promise<UserCredential> {
    const hashedPassword = this.hashPassword(password);
    const credentials = await this.repository.findOneAndUpdate({ email: username }, { password: hashedPassword });
    return credentials;
  }

  private hashPassword(password: string): string {
    const saltOrRounds = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, saltOrRounds);
  }
}

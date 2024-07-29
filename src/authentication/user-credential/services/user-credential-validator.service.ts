import { Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { UserCredentialRepository } from "../repositories/user-credential.repository";
import bcrypt from "bcrypt"

@Injectable()
export class UserCredentialValidatorService {

  constructor(
    @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository  ) { }

  async validate(username: string, password: string): Promise<number> {
    const credentials = await this.repository.findOne({ where: { email: username, status: true }, select: { user: true, password: true } });
    const passwordIsValid = this.validatePassword(password, credentials.password);
    if (!passwordIsValid) throw new ForbiddenException(["Wrong credentials"]);
    return credentials.user;
  }

  validatePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

}

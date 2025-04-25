import { Injectable, Provider } from "@nestjs/common";
import { AuthValidateApiKeyCommandImpl } from "@omega/auth/application/command/auth/auth-validate-apikey.command";
import { AuthValidateApiKeyCommandToken } from "../../inject/command.inject";
import { ApiKeyValueRepository } from "@omega/auth/application/repository/auth/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";

@Injectable()
class AuthValidateApiKeyNestCommand extends AuthValidateApiKeyCommandImpl {
    constructor(
        @InjectModelRepository('ApiKeyValue') repository: ApiKeyValueRepository
    ) {
        super(repository);
    }
}

export const AuthValidateApiKeyCommandProvider: Provider = {
    provide: AuthValidateApiKeyCommandToken,
    useClass: AuthValidateApiKeyNestCommand
}
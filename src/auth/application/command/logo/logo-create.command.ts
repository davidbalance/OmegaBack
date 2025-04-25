import { Logo } from "@omega/auth/core/domain/logo/logo.domain";
import { CreateLogoPayload } from "@omega/auth/core/domain/logo/payloads/logo.payload";
import { CommandHandlerAsync } from "@shared/shared/application";
import { LogoConflictError } from "@omega/auth/core/domain/logo/errors/logo.errors";
import { LogoRepository } from "../../repository/logo/aggregate.repositories";

export type LogoCreateCommandPayload = CreateLogoPayload;
export interface LogoCreateCommand extends CommandHandlerAsync<LogoCreateCommandPayload, void> { }

export class LogoCreateCommandImpl implements LogoCreateCommand {
    constructor(
        private readonly repository: LogoRepository
    ) { }

    async handleAsync(value: LogoCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new LogoConflictError(value.name);

        const resource = Logo.create(value);
        await this.repository.saveAsync(resource);
    }
}
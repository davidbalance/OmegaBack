import { CorporativeConflictError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { BaseCorporativeCreateCommand, BaseCorporativeCreateCommandPayload } from "./base.corporative-create.command";

export type CorporativeCreateCommandPayload = BaseCorporativeCreateCommandPayload;
export class CorporativeCreateCommand extends BaseCorporativeCreateCommand<CorporativeCreateCommandPayload> {

    async handleAsync(value: CorporativeCreateCommandPayload): Promise<void> {
        const exists = await this.aggregateRepository.findOneAsync({ filter: [{ field: 'name', operator: 'eq', value: value.name }] });
        if (exists) throw new CorporativeConflictError(value.name);

        const corporative = this.createCorporative(value);
        await this.aggregateRepository.saveAsync(corporative);
    }
}
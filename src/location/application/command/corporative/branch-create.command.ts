import { BaseBranchCreateCommand, BaseBranchCreateCommandPayload } from "./base.branch-create.command";

export type BranchCreateCommandPayload = BaseBranchCreateCommandPayload;
export class BranchCreateCommand extends BaseBranchCreateCommand<BranchCreateCommandPayload> {

    async handleAsync(value: BranchCreateCommandPayload): Promise<void> {
        const corporative = await this.getAggregate(value);
        corporative.addBranchToCompany(value);
        await this.repository.saveAsync(corporative);
    }
}
import { DomainEvent } from "@shared/shared/domain";
import { BranchExternalKeyProps } from "../value-objects/branch-external-key.value-object";

const BranchEventKeys = {
    ExternalKeyAdded: "branch.externalKey.added"
}

export class BranchIsEvent {
    public static isBranchExternalKeyAddedEvent(event: DomainEvent<unknown>): event is BranchExternalKeyAddedEvent {
        return event.key === BranchEventKeys.ExternalKeyAdded;
    }
}

export class BranchExternalKeyAddedEvent extends DomainEvent<BranchExternalKeyProps> {
    constructor(value: BranchExternalKeyProps) {
        super({ key: BranchEventKeys.ExternalKeyAdded, value });
    }
}
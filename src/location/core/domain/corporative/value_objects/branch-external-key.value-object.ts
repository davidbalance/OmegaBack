import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type BranchExternalKeyProps = ExternalKeyProps & {
    branchId: string;
}

export class BranchExternalKey extends ExternalKey {
    private readonly _branchId: string;

    public get branchId(): Readonly<string> {
        return this._branchId;
    }

    protected constructor(props: BranchExternalKeyProps) {
        super(props);
        this._branchId = props.branchId;
    }

    public static create(value: BranchExternalKeyProps): BranchExternalKey {
        return new BranchExternalKey(value);
    }
}
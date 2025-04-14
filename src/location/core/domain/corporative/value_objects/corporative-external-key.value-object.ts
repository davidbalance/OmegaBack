import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CorporativeExternalKeyProps = ExternalKeyProps & {
    corporativeId: string;
}

export class CorporativeExternalKey extends ExternalKey {
    private readonly _corporativeId: string;

    public get corporativeId(): Readonly<string> {
        return this._corporativeId;
    }

    protected constructor(props: CorporativeExternalKeyProps) {
        super(props);
        this._corporativeId = props.corporativeId;
    }

    public static create(value: CorporativeExternalKeyProps): CorporativeExternalKey {
        return new CorporativeExternalKey(value);
    }
}
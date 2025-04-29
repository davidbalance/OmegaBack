import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CompanyExternalKeyProps = ExternalKeyProps & {
    companyId: string;
}

export class CompanyExternalKey extends ExternalKey {
    private readonly _companyId: string;

    public get companyId(): Readonly<string> {
        return this._companyId;
    }

    protected constructor(props: CompanyExternalKeyProps) {
        super(props);
        this._companyId = props.companyId;
    }

    public static create(value: CompanyExternalKeyProps): CompanyExternalKey {
        return new CompanyExternalKey(value);
    }
}
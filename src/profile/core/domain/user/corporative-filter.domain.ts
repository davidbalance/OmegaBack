import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateCorporativeFilterPayload } from "./payloads/corporative-filter.payload";

type CorporativeFilterProps = EntityProps & {
    corporativeId: string;
    corporativeName: string;
    userId: string;
}

export class CorporativeFilter extends Entity<CorporativeFilterProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get corporativeName(): Readonly<string> {
        return this.props.corporativeName;
    }

    public static create(props: CreateCorporativeFilterPayload): CorporativeFilter {
        return new CorporativeFilter({
            ...props,
            id: crypto.randomUUID()
        })
    }

    public static rehydrate(props: CorporativeFilterProps): CorporativeFilter {
        return new CorporativeFilter(props);
    }
}

import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateCompanyFilterPayload } from "./payloads/company-filter.payload";

type CompanyFilterProps = EntityProps & {
    corporativeId: string;
    corporativeName: string;
    companyId: string;
    companyRuc: string;
    userId: string;
}

export class CompanyFilter extends Entity<CompanyFilterProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get corporativeId(): Readonly<string> {
        return this.props.corporativeId;
    }

    public get corporativeName(): Readonly<string> {
        return this.props.corporativeName;
    }

    public get companyId(): Readonly<string> {
        return this.props.companyId;
    }

    public get companyRuc(): Readonly<string> {
        return this.props.companyRuc;
    }

    public static create(props: CreateCompanyFilterPayload): CompanyFilter {
        return new CompanyFilter({
            ...props,
            id: crypto.randomUUID()
        })
    }

    public static rehydrate(props: CompanyFilterProps): CompanyFilter {
        return new CompanyFilter(props);
    }
}

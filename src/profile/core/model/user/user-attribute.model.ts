import { Model } from "@shared/shared/domain/model";

type UserAttributeModelProps = {
    attributeId: string;
    attributeName: string;
    attributeValue: string;
    userId: string;
}
export class UserAttributeModel extends Model<UserAttributeModelProps> {
    public get attributeId(): Readonly<string> {
        return this.props.attributeId;
    }
    
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get attributeName(): Readonly<string> {
        return this.props.attributeName;
    }

    public get attributeValue(): Readonly<string> {
        return this.props.attributeValue;
    }

}
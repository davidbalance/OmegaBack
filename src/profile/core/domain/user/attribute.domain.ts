import { EntityProps, Entity } from "@shared/shared/domain";
import { CreateAttributePayload } from "./payloads/attribute.payloads";

type AttributeProps = EntityProps & {
    userId: string;
    name: string;
    value: string;
};
export class Attribute extends Entity<AttributeProps> {

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get value(): Readonly<string> {
        return this.props.value;
    }


    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public static create(value: CreateAttributePayload): Attribute {
        return new Attribute({
            ...value,
            id: crypto.randomUUID(),
            name: value.attributeName,
            value: value.attributeValue,
        });
    }

    public static rehydrate(props: AttributeProps): Attribute {
        return new Attribute(props);
    }

    public addValue(value: string): void {
        this.updateProps({ value });
    }
}
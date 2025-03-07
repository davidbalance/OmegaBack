import { EntityProps, Entity } from "@shared/shared/domain";
import { CreateDiseasePayload } from "./payloads/disease.payloads";

export type DiseaseProps = EntityProps & {
    groupId: string;
    name: string;
}
export class Disease extends Entity<DiseaseProps> {
    public get groupId(): Readonly<string> {
        return this.props.groupId;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(value: CreateDiseasePayload): Disease {
        return new Disease({ id: crypto.randomUUID(), ...value });
    }

    public static rehydrate(props: DiseaseProps): Disease {
        return new Disease(props);
    }

    public rename(name: string): void {
        this.updateProps({ name });
    }
}
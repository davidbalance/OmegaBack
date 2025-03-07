import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateDoctorPayload } from "./payloads/doctor.payload";

type DoctorProps = EntityProps & {
    userId: string;
    signature: string;
    hasFile: boolean;
}
export class Doctor extends Entity<DoctorProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get signature(): Readonly<string> {
        return this.props.signature;
    }


    public get hasFile(): Readonly<boolean> {
        return this.props.hasFile;
    }

    public static create(value: CreateDoctorPayload): Doctor {
        return new Doctor({
            ...value,
            id: crypto.randomUUID(),
            hasFile: false
        });
    }

    public static rehydrate(props: DoctorProps): Doctor {
        return new Doctor(props);
    }

    public addFile(): void {
        this.updateProps({ hasFile: true });
    }
}
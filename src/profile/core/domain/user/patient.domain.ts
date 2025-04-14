import { Entity, EntityProps } from "@shared/shared/domain";
import { CreatePatientPayload } from "./payloads/patient.payloads";

type PatientProps = EntityProps & {
    userId: string;
    gender: "male" | "female";
    birthday: Date;
}
export class Patient extends Entity<PatientProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get gender(): Readonly<"male" | "female"> {
        return this.props.gender;
    }

    public get birthday(): Readonly<Date> {
        return this.props.birthday;
    }

    public static create(value: CreatePatientPayload): Patient {
        return new Patient({
            ...value,
            id: crypto.randomUUID()
        });
    }

    public static rehydrate(props: PatientProps): Patient {
        return new Patient(props);
    }
}
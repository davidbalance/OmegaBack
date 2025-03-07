import { CreateAttributePayload } from "./attribute.payloads";
import { CreatePatientPayload } from "./patient.payloads";

export type CreateUserPayload = {
    dni: string;
    name: string;
    lastname: string;
    email: string | null | undefined;
}

export type EditUserPayload = {
    name: string;
    lastname: string;
}

export type AddAttributeToUserPayload = Omit<CreateAttributePayload, 'userId'>;

export type AddPatientToUserPayload = Omit<CreatePatientPayload, 'userId'>;
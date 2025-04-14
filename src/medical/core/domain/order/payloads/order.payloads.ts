import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";

export type CreateOrderPayload = {
    patientId: string;
    corporativeName: string;
    companyRuc: string;
    companyName: string;
    branchName: string;
    doctorDni: string;
    doctorFullname: string;
    process: string;
    year: number;
}

export type AddOrderExternalKeyPayload = ExternalKeyProps;
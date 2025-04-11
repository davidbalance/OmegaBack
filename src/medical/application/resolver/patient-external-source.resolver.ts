import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type PatientExternalSourceResolverPayload = ResolverPayload & {
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientEmail: string;
    patientGender: "male" | "female";
    patientBirthday: Date;
}
export interface PatientExternalSourceResolver
    extends Resolver<PatientExternalSourceResolverPayload, ClientModel> { }
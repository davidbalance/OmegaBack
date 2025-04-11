import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { Resolver, ResolverPayload } from "@shared/shared/application/resolver.interface";

export type OrderExternalSourceResolverPayload = ResolverPayload & {
    owner: string;
    patientDni: string;
    corporativeName: string;
    companyRuc: string;
    companyName: string;
    branchName: string;
    doctorDni: string;
    doctorFullname: string;
    orderKey: string;
    orderProcess: string;
    orderYear: number;

    branchKey?: string;
    companyKey?: string;
    corporativeKey?: string;
}
export interface OrderExternalSourceResolver
    extends Resolver<OrderExternalSourceResolverPayload, OrderExternalConnectionModel> { }
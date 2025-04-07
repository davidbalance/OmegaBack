import { CreateBranchFromExternalSourcePayload } from "@omega/location/application/service/create-branch-from-external-source.service";
import { OrderExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";

export class OrderExternalCreatedMapper {
    static toService(payload: Required<OrderExternalCreatedEventPayload>): CreateBranchFromExternalSourcePayload {
        return {
            branchKey: payload.branchKey,
            branchName: payload.branchName,
            cityId: 78,
            companyKey: payload.companyKey,
            companyName: payload.companyName,
            companyRuc: payload.companyRuc,
            companyAddress: "NO SPECIFIC ADDRESS",
            companyPhone: "0999999999",
            corporativeKey: payload.corporativeKey,
            corporativeName: payload.corporativeName,
            owner: payload.owner,
        }
    }
}
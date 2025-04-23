import { OrderCloudFileModel } from "@omega/medical/core/model/order/order-cloud-file.model";
import { OrderCloudFileResponseDto } from "../dto/response/order.dto";

export class OrderCloudFileModelMapper {
    public static toDTO(value: OrderCloudFileModel): OrderCloudFileResponseDto {
        return {
            testId: value.testId,
            examName: value.examName,
            patientDni: value.patientDni,
            patientFullname: value.patientFullname,
            reportHasContent: value.reportHasContent,
            resultHasFile: value.resultHasFile,
        }
    }
}
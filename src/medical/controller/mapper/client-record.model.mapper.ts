import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordResponseDto } from "../dto/response/client.dto";

export class ClientRecordModelMapper {
    public static toDTO(value: ClientRecordModel): ClientRecordResponseDto {
        return {
            recordEmissionDate: value.recordEmissionDate,
            recordId: value.recordId,
            recordName: value.recordName
        }
    }
}
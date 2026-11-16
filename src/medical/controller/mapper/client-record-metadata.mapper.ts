import { ClientRecordModel } from "@omega/medical/core/model/client/client-record.model";
import { ClientRecordMetadataResponseDto } from "../dto/response/client.dto";

export class ClientRecordMetadataMapper {
    public static toDTO(value: ClientRecordModel): ClientRecordMetadataResponseDto {
        return {
            patientDni: value.patientDni,
            metadata: value.recordMetadata as any
        }
    }
}
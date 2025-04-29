import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamTypeResponseDto } from "../../dto/response/exam-type.dto";

export class ExamTypeModelMapper {
    public static toDTO(value: ExamTypeModel): ExamTypeResponseDto {
        return {
            typeId: value.typeId,
            typeName: value.typeName,
            hasSubtypes: value.hasSubtypes
        }
    }
}
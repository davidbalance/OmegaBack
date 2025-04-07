import { CreateExamFromExternalSourcePayload } from "@omega/laboratory/application/service/create-exam-from-external-source.service";
import { TestExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";

export class TestExternalCreatedMapper {
    static toService(payload: Required<TestExternalCreatedEventPayload>): CreateExamFromExternalSourcePayload {
        return {
            examKey: payload.examKey,
            examName: payload.examName,
            subtypeKey: payload.examSubtypeKey,
            subtypeName: payload.examSubtype,
            typeKey: payload.examTypeKey,
            typeName: payload.examType,
            owner: payload.owner,
        }
    }
}
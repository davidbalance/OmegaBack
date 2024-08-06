import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeExternalConnectionService } from "../exam-type-external-connection.service";
import { ExamTypeExternalKeyService } from "../exam-type-external-key.service";
import { mockExamTypeExternalKey } from "./stub/exam-type-external-key.stub";
import { mockExamType } from "./stub/exam-type.stub";
import { PostExamTypeRequestDto } from "../../dtos/request/post.exam-type.dto";
import { NotFoundException } from "@nestjs/common";
import { PatchExamTypeRequestDto } from "../../dtos/request/patch.exam-type.dto";

describe('ExamTypeExternalConnectionService', () => {
    let service: ExamTypeExternalConnectionService;
    let repository: jest.Mocked<ExamTypeRepository>;
    let externalKeyService: jest.Mocked<ExamTypeExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamTypeExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(ExamTypeRepository);
        externalKeyService = unitRef.get(ExamTypeExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});

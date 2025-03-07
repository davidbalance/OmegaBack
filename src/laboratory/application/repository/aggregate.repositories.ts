import { ExamType, ExamTypeProps } from "@omega/laboratory/core/domain/exam/exam-type.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type ExamTypeRepository = AggregateRepository<ExamTypeProps, ExamType>;
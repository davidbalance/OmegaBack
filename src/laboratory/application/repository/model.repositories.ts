import { ExamExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-external-connection.model";
import { ExamSubtypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-subtype-external-connection.model";
import { ExamSubtypeOptionModel } from "@omega/laboratory/core/model/exam/exam-subtype-option.model";
import { ExamSubtypeModel } from "@omega/laboratory/core/model/exam/exam-subtype.model";
import { ExamTypeExternalConnectionModel } from "@omega/laboratory/core/model/exam/exam-type-external-connection.model";
import { ExamTypeOptionModel } from "@omega/laboratory/core/model/exam/exam-type-option.model";
import { ExamTypeModel } from "@omega/laboratory/core/model/exam/exam-type.model";
import { ExamModel } from "@omega/laboratory/core/model/exam/exam.model";
import { CountRepository, ModelRepository } from "@shared/shared/providers";

export type ExamTypeRepository = ModelRepository<ExamTypeModel> & CountRepository<ExamTypeModel>;
export type ExamTypeOptionRepository = ModelRepository<ExamTypeOptionModel>;
export type ExamTypeExternalConnectionRepository = ModelRepository<ExamTypeExternalConnectionModel>;

export type ExamSubtypeOptionRepository = ModelRepository<ExamSubtypeOptionModel>;
export type ExamSubtypeRepository = ModelRepository<ExamSubtypeModel> & CountRepository<ExamSubtypeModel>;
export type ExamSubtypeExternalConnectionRepository = ModelRepository<ExamSubtypeExternalConnectionModel>;

export type ExamRepository = ModelRepository<ExamModel>
export type ExamExternalConnectionRepository = ModelRepository<ExamExternalConnectionModel>
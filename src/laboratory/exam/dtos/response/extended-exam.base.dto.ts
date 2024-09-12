import { OmitType } from "@nestjs/mapped-types";
import { Exam } from "./exam.base.dto";

export class ExtendedExam extends OmitType(Exam, ['subtype']) { }
import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { MedicalResultReport } from "../types/medical-result-report.type";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultYearResponseDto } from "../dtos/response/base.medical-result-year.response.dto";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/post.medical-result-disease-report.request.dto";
import { ExcelReportType } from "../types/excel-report.type";
import { excelColumns } from "../utils/columns";

@Injectable()
export class MedicalResultDiseaseReportService {
    constructor(
        @Inject(MedicalResultDiseaseRepository) private readonly repository: MedicalResultDiseaseRepository,
        @Inject(ExcelManagerService) private excel: ExcelManagerService
    ) { }

    async getCurrentYears(): Promise<MedicalResultYearResponseDto[]> {
        const data = await this.repository.query('medical_disease')
            .leftJoinAndSelect('medical_disease.result', 'medical_result')
            .select('YEAR(medical_result.createAt)', 'year')
            .distinct(true)
            .orderBy('year', 'ASC')
            .getRawMany<MedicalResultYearResponseDto>();
        return data;
    }

    async generateReport(searchParam: PostMedicalResultDiseaseReportRequestDto): Promise<StreamableFile> {
        const values = await this.find(searchParam);

        const processedValues: ExcelReportType[] = values.map((e) => ({
            ...e,
            ageRange: (e.age < 50)
                ? 'de 18 a 19'
                : (e.age >= 50 && e.age <= 64
                    ? 'de 50 a 64'
                    : 'mayor a 64'),
            diseaseFindings: e.examType === 'LABORATORIO CLINICO'
                ? 'SALUD GENERAL'
                : '',
            gender: e.gender.toLocaleUpperCase().slice(0, 1)
        }));

        const stream = await this.excel.craft(processedValues, excelColumns as any, `morbilidades_export_data-${dayjs().format('YYYYMM')}`)
        return stream;
    }

    private async find({ year, corporativeName, companyRuc }: PostMedicalResultDiseaseReportRequestDto): Promise<MedicalResultReport[]> {

        const query = this.repository.query('medical_disease')
            .leftJoinAndSelect('medical_disease.result', 'medical_result')
            .leftJoinAndSelect('medical_result.order', 'medical_order')
            .leftJoinAndSelect('medical_order.client', 'medical_client')
            .leftJoinAndSelect('medical_client.email', 'medical_email', 'medical_email.default = :emailFlag', { emailFlag: true })
            .select(['medical_order.companyName AS company',
                'medical_order.branchName AS branch',
                'medical_client.patient_role AS role',
                'medical_client.managementName AS management',
                'medical_client.areaName AS area',
                'YEAR(medical_result.createAt) AS year',
                'medical_order.process AS process',
                'medical_result.createAt AS date',
                'medical_client.jobPositionName AS jobPosition',
                'medical_client.dni AS dni',
                'medical_client.name AS name',
                'medical_client.lastname AS lastname',
                'medical_email.email AS email',
                'YEAR(NOW()) - CAST(YEAR(medical_client.birthday) AS SIGNED) AS age',
                'medical_client.birthday AS birthday',
                'medical_client.gender AS gender',
                'medical_result.examName AS exam',
                'medical_result.examSubtype AS examSubtype',
                'medical_result.examType AS examType',
                'medical_disease.diseaseName AS disease',
                'medical_disease.diseaseGroupName AS diseaseGroup',
                'medical_disease.diseaseCommentary AS diseaseCommentary'])
            .where('1');


        if (year) {
            query.andWhere('YEAR(medical_result.createAt) = :year', { year: year });
        }
        if (corporativeName) {
            query.andWhere('medical_order.corporativeName LIKE :corporativeName', { corporativeName: corporativeName });
        }
        if (companyRuc) {
            query.andWhere('medical_order.companyRuc LIKE :companyRuc', { companyRuc: companyRuc });
        }


        const data = await query.setParameter('year', year)
            .orderBy('medical_order.create_at', 'ASC').getRawMany<MedicalResultReport>();
        return data;
    }
}
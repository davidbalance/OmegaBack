import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { MedicalResultReport } from "../types/medical-result-report.type";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultYear } from "../dtos/response/medical-result-year.base.dto";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/medical-result-disease-report.post.dto";
import { ExcelReportType } from "../types/excel-report.type";
import { excelColumns } from "../utils/columns";

@Injectable()
export class MedicalResultDiseaseReportService {
    constructor(
        @Inject(MedicalResultDiseaseRepository) private readonly repository: MedicalResultDiseaseRepository,
        @Inject(ExcelManagerService) private excel: ExcelManagerService
    ) { }

    async getCurrentYears(): Promise<MedicalResultYear[]> {
        const data = await this.repository.query('medical_disease')
            .leftJoinAndSelect('medical_disease.result', 'medical_result')
            .leftJoinAndSelect('medical_result.order', 'medical_order')
            .select('YEAR(medical_order.createAt)', 'year')
            .distinct(true)
            .orderBy('year', 'ASC')
            .getRawMany<MedicalResultYear>();
        return data;
    }

    async generateReport(searchParam: PostMedicalResultDiseaseReportRequestDto): Promise<StreamableFile> {
        const values = await this.find(searchParam);

        const processedValues: ExcelReportType[] = values
            .map((e) => ({
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
            })).map(e => Object
                .entries(e)
                .reduce((prev, [key, value]) => ({
                    ...prev,
                    [key]: typeof value === "number"
                        ? value
                        : `${value}`.toUpperCase()
                }), e));

        const stream = await this.excel.craft(processedValues, excelColumns as any, `morbilidades_export_data-${dayjs().format('YYYYMM')}`)
        return stream;
    }

    private async find({ year, corporativeName, companyRuc }: PostMedicalResultDiseaseReportRequestDto): Promise<MedicalResultReport[]> {
        const query = this.repository.query('medical_disease')
            .leftJoinAndSelect('medical_disease.result', 'medical_result')
            .leftJoinAndSelect('medical_result.order', 'medical_order')
            .leftJoinAndSelect('medical_order.client', 'medical_client')
            .leftJoinAndSelect('medical_client.email', 'medical_email', 'medical_email.default = :emailFlag', { emailFlag: true })
            .select('medical_order.companyName', 'company')
            .addSelect('medical_order.branchName', 'branch')
            .addSelect('medical_client.patient_role', 'role')
            .addSelect('medical_client.managementName', 'management')
            .addSelect('medical_client.areaName', 'area')
            .addSelect('YEAR(medical_order.createAt)', 'year')
            .addSelect('medical_order.process', 'process')
            .addSelect('medical_result.createAt', 'date')
            .addSelect('medical_client.jobPositionName', 'jobPosition')
            .addSelect('medical_client.dni', 'dni')
            .addSelect('medical_client.name', 'name')
            .addSelect('medical_client.lastname', 'lastname')
            .addSelect('medical_email.email', 'email')
            .addSelect('YEAR(NOW()) - CAST(YEAR(medical_client.birthday) AS SIGNED)', 'age')
            .addSelect('medical_client.birthday', 'birthday')
            .addSelect('medical_client.gender', 'gender')
            .addSelect('medical_result.examName', 'exam')
            .addSelect('medical_result.examSubtype', 'examSubtype')
            .addSelect('medical_result.examType', 'examType')
            .addSelect('medical_disease.diseaseName', 'disease')
            .addSelect('medical_disease.diseaseGroupName', 'diseaseGroup')
            .addSelect('medical_disease.diseaseCommentary', 'diseaseCommentary')
            .where('1');


        if (year) {
            query.andWhere('YEAR(medical_order.createAt) = :year', { year: year });
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
import { Inject, Injectable, StreamableFile } from "@nestjs/common";
import { MedicalResultReport } from "../types/medical-result-report.type";
import { ExcelManagerService } from "@/shared/excel-manager/excel-manager.service";
import dayjs from "dayjs";
import { MedicalResultDiseaseRepository } from "../repositories/medical-result-disease.repository";
import { MedicalResultYearResponseDto } from "../dtos/response/base.medical-result-year.response.dto";
import { PostMedicalResultDiseaseReportRequestDto } from "../dtos/request/post.medical-result-disease-report.request.dto";

type ExcelReportType = (MedicalResultReport & {
    ageRange: string,
    diseaseFindings: string
})

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
        }))

        const columns: { header: string, key: keyof ExcelReportType }[] = [
            { header: 'Empresa', key: 'company' },
            { header: 'Sucursal', key: 'branch' },
            { header: 'Gerencia', key: 'management' },
            { header: 'Area', key: 'area' },
            { header: 'Año', key: 'year' },
            { header: 'Proceso', key: 'process' },
            { header: 'Fecha', key: 'date' },
            { header: 'Puesto de Trabajo', key: 'jobPosition' },
            { header: 'Rol', key: 'role' },
            { header: 'Cedula', key: 'dni' },
            { header: 'Nombres', key: 'name' },
            { header: 'Apellidos', key: 'lastname' },
            { header: 'Email', key: 'email' },
            { header: 'Cumpleaños', key: 'birthday' },
            { header: 'Edad', key: 'age' },
            { header: 'Rango de edad', key: 'ageRange' },
            { header: 'Sexo', key: 'gender' },
            { header: 'T. Prueba', key: 'examType' },
            { header: 'S.T. Prueba', key: 'examSubtype' },
            { header: 'Prueba', key: 'exam' },
            { header: 'Grupo Morbilidad', key: 'diseaseGroup' },
            { header: 'Morbilidad', key: 'disease' },
            { header: 'Observacion', key: 'diseaseCommentary' },
            { header: 'Hallazgos de Morbilidad', key: 'diseaseFindings' },
        ];

        const stream = await this.excel.craft(processedValues, columns as any, `morbilidades_export_data-${dayjs().format('YYYYMM')}`)
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
import { Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { DoctorService } from '@/user/doctor/doctor.service';
import { MedicalReportService } from '../medical-report/medical-report.service';
import { CompanyService } from '@/location/company/company.service';
import dayjs from 'dayjs';
import { Result } from './entities/result.entity';
import { ResultSendAttributeService } from './result-send-attribute/result-send-attribute.service';
import { Not } from 'typeorm';

interface FindResultParams {
  exam?: number;
  disease?: number;
  doctor?: number;
}

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(MedicalReportService) private readonly reportService: MedicalReportService,
    @Inject(CompanyService) private readonly companyService: CompanyService,
    @Inject(ResultSendAttributeService) private readonly attributeService: ResultSendAttributeService
  ) { }

  async find(): Promise<Result[]> {
    const results = await this.repository.find({
      select: {
        id: true,
        examName: true,
        disease: true,
        report: {
          id: true,
          content: true
        },
        order: {
          patientFullname: true
        }
      },
      relations: {
        order: true
      }
    });
    return results;
  }

  async findResultsByDoctor(doctor: number): Promise<Result[]> {
    const currentDoctor = await this.doctorService.findOne(doctor);
    const results = await this.repository.find({
      where: { doctorDni: currentDoctor.user.dni },
      select: {
        id: true,
        examName: true,
        disease: true,
        report: {
          id: true,
          content: true
        },
        order: {
          patientFullname: true
        }
      },
      relations: {
        order: true
      }
    });

    return results;
  }

  async findOneResultAndUpdateDisease(id: number, { ...data }: FindOneResultAndUpdateDiseaseRequestDTO): Promise<Result> {
    const result = await this.repository.findOneAndUpdate({ id }, { disease: data.disease });
    return result;
  }

  async insertMedicalReport(id: number, { ...data }: InsertMedicalReportRequestDTO): Promise<Result> {
    const medicalResult = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        examName: true,
        doctorDni: true,
        doctorFullname: true,
        doctorSignature: true,
        order: {
          id: true,
          company: true,
          patientDni: true,
          patientFullname: true,
          patientBirthday: true
        }
      },
      relations: {
        order: true
      }
    });
    const company = await this.companyService.findOneByRuc(medicalResult.order.company);
    const medicalReport = await this.reportService.create({
      content: data.content,
      order: medicalResult.order.id,
      companyName: company.name,
      doctorDni: medicalResult.doctorDni,
      doctorFullname: medicalResult.doctorFullname,
      doctorSignature: medicalResult.doctorSignature,
      patientAge: dayjs().diff(medicalResult.order.patientBirthday, 'year'),
      patientDni: medicalResult.order.patientDni,
      patientFullname: medicalResult.order.patientFullname,
      examName: medicalResult.examName,
    });
    await this.repository.findOneAndUpdate({ id }, { report: medicalReport });
    medicalResult.report = medicalReport;
    return medicalResult;
  }

  async findResultsWithoutValue(value: string): Promise<Result[]> {
    const results = await this.repository.find({ where: { sendAttributes: { value: Not(value) } } });
    return results;
  }

  async assignSendAttribute(id: number, value: string): Promise<Result> {
    const attribute = await this.attributeService.create({ value: value });
    const { sendAttributes } = await this.repository.findOne({ where: { id: id }, relations: { sendAttributes: true } });
    sendAttributes.concat(attribute);
    const report = await this.repository.findOneAndUpdate({ id: id }, { sendAttributes: sendAttributes });
    return report;
  }
}

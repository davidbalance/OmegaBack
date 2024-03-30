import { Inject, Injectable } from '@nestjs/common';
import { ResultRepository } from './result.repository';
import { FindResult } from '../common/dtos';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { PatientService } from '@/user/patient/patient.service';
import { DoctorService } from '@/user/doctor/doctor.service';
import { MedicalReportService } from '../medical-report/medical-report.service';
import { CompanyService } from '@/location/company/company.service';

interface FindResultParams {
  exam?: number;
  disease?: number;
  doctor?: number;
}

@Injectable()
export class ResultService {

  constructor(
    @Inject(ResultRepository) private readonly repository: ResultRepository,
    @Inject(PatientService) private readonly patientService: PatientService,
    @Inject(DoctorService) private readonly doctorService: DoctorService,
    @Inject(MedicalReportService) private readonly reportService: MedicalReportService,
    @Inject(CompanyService) private readonly companyService: CompanyService
  ) { }

  async findResultsByDoctor(doctor: number): Promise<FindResult[]> {
    const results = await this.repository.find({
      where: { doctor: doctor },
      select: {
        id: true,
        examName: true,
        disease: true,
        address: true,
        report: {
          id: true,
          content: true
        }
      }
    });

    return results;
  }

  async findOneResultAndUpdateDisease(id: number, { ...data }: FindOneResultAndUpdateDiseaseRequestDTO): Promise<FindResult> {
    const result = await this.repository.findOneAndUpdate({ id }, { disease: data.disease });
    return result;
  }

  async insertMedicalReport(id: number, { ...data }: InsertMedicalReportRequestDTO): Promise<FindResult> {
    const medicalResult = await this.repository.findOne({
      where: { id },
      select: {
        id: true,
        examName: true,
        doctor: true,
        order: {
          id: true,
          company: true,
          patient: true
        }
      },
      relations: {
        order: true
      }
    });
    const doctor = await this.doctorService.findOne(medicalResult.doctor);
    const patient = await this.patientService.findOneByDni(medicalResult.order.patient);
    const company = await this.companyService.findOneByRuc(medicalResult.order.company);
    const medicalReport = await this.reportService.create({
      content: data.content,
      order: medicalResult.order.id,
      companyName: company.name,
      doctorDni: doctor.dni,
      doctorFullname: `${doctor.name} ${doctor.lastname}`,
      doctorSignature: doctor.signature,
      patientAge: patient.age,
      patientDni: patient.dni,
      patientFullname: `${patient.lastname} ${patient.name}`,
      examName: medicalResult.examName,
    });
    const newMedicalResult = this.repository.findOneAndUpdate({ id }, { report: medicalReport });
    return newMedicalResult;
  }

}

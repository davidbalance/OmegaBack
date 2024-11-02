import { Inject, Injectable, Logger, StreamableFile } from "@nestjs/common";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultFileManagementService } from "./medical-result-file-management.service";
import { ZipperService } from "@/shared/zipper/zipper.service";
import path from "path";

type ResultTree = { filePath: string, examName: string, order: string, corporativeName: string, companyName: string, companyRuc: string, branchName: string, process: string, year: string, dni: string, name: string, lastname: string };
type RetriveTreeType = {
  year?: string,
  corporativeName?: string,
  company?: string,
  branch?: string,
  process?: string,
  patient?: string
}

@Injectable()
export class MedicalResultFileTreeService {

  constructor(
    @Inject(MedicalResultRepository) private readonly repository: MedicalResultRepository,
    @Inject(MedicalResultFileManagementService) private readonly storage: MedicalResultFileManagementService,
    @Inject(ZipperService) private readonly zipper: ZipperService,
  ) { }

  private async retriveResults(data: RetriveTreeType): Promise<ResultTree[]> {
    const query = this.repository.query('result')
      .leftJoinAndSelect('result.order', 'order')
      .leftJoinAndSelect('order.client', 'client')
      .select('result.filePath', 'filePath')
      .addSelect('result.examName', 'examName')
      .addSelect('LPAD(order.id, 9, "0")', 'order')
      .addSelect('order.corporativeName', 'corporativeName')
      .addSelect('order.companyName', 'companyName')
      .addSelect('order.companyRuc', 'companyRuc')
      .addSelect('order.branchName', 'branchName')
      .addSelect('order.process', 'process')
      .addSelect('YEAR(order.createAt)', 'year')
      .addSelect('client.dni', 'dni')
      .addSelect('client.name', 'name')
      .addSelect('client.lastname', 'lastname')
      .where('result.hasFile = 1')
      .andWhere('result.filePath IS NOT NULL');

    if (data.year) {
      query.andWhere('YEAR(order.createAt) = :year', { year: data.year });
    }

    if (data.corporativeName) {
      query.andWhere('order.corporativeName LIKE :corporativeName', { corporativeName: data.corporativeName });
    }

    if (data.company) {
      query.andWhere('order.companyRuc = :company', { company: data.company });
    }

    if (data.branch) {
      query.andWhere('order.branchName LIKE :branch', { branch: data.branch });
    }

    if (data.process) {
      query.andWhere('order.process LIKE :process', { process: data.process });
    }

    if (data.patient) {
      query.andWhere('client.dni LIKE :dni', { dni: data.patient });
    }

    return query.getRawMany<ResultTree>();
  }

  async getTree(data: RetriveTreeType): Promise<StreamableFile> {
    const values = await this.retriveResults(data);
    const sources: { source: string, name: string }[] = [];
    for (const value of values) {
      sources.push({
        source: value.filePath,
        name: path.join(`${value.year}`, value.corporativeName, `${value.companyName}_${value.companyRuc}`, value.branchName, value.process, `${value.dni}_${value.name}_${value.lastname}`, `${value.order}_${value.examName}.pdf`.toLocaleLowerCase())
      });
    }

    const zip = await this.zipper.zip(sources);
    return new StreamableFile(zip);
  }

}

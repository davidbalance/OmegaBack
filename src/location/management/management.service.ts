import { Inject, Injectable } from '@nestjs/common';
import { PATCHManagementRequestDto, POSTManagementRequestDto } from './dto/management.request.dto';
import { Management } from './entities/management.entity';
import { ManagementRepository } from './management.repository';

@Injectable()
export class ManagementService {
  constructor(
    @Inject(ManagementRepository) private readonly repository: ManagementRepository
  ) { }

  /**
   * Crea una gerencia.
   * @param createManagementDto 
   * @returns 
   */
  async create(createManagementDto: POSTManagementRequestDto): Promise<Management> {
    const management = await this.repository.create(createManagementDto);
    return management;
  }

  /**
   * Encuentra todas las gerencias activas.
   * @returns 
   */
  async find(): Promise<Management[]> {
    const managements = await this.repository.find({
      where: {
        status: true
      },
      relations: {
        areas: true
      }
    });
    return managements;
  }

  /**
   * Encuentra una gerencia usando su identificador unico.
   * @param id 
   * @returns 
   */
  async findOneById(id: number): Promise<Management> {
    const management = await this.repository.findOne({ where: { id: id } });
    return management;
  }

  /**
   * Encuentra una gerencia por su identificador unico y lo modifica.
   * @param id 
   * @param updateManagementDto 
   * @returns 
   */
  async findOneByIdAndUpdate(id: number, updateManagementDto: PATCHManagementRequestDto): Promise<Management> {
    const management = await this.repository.findOneAndUpdate({ id: id }, updateManagementDto);
    return management;
  }

  /**
   * Encuentra una gerencia por su identificador unico y lo inactiva.
   * @param id 
   */
  async findOneAndDelete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id: id });
  }
}

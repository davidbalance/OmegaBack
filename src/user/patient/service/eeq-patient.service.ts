import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { GETPatientOrderedRequestDto } from '../dtos/patient.request.dto';
import { FlatEEQPatient } from '../dtos/eeq-patient.response.dto';

@Injectable()
export class EeqPatientService {

  private readonly companyName: string = 'employee_of';
  private readonly companyValue: string = '1790053881001'
  private readonly roleKey: string = 'role';

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository,
  ) { }

  private async flatPatient(patient: Patient): Promise<FlatEEQPatient | null> {
    return new Promise((resolve, reject) => {
      const role = patient.user.extraAttributes.find(e => e.name === 'role');
      if (!role) resolve(null);
      const flattenedPatient: FlatEEQPatient = { ...patient.user, ...patient, user: patient.user.id, role: role.value };
      resolve(flattenedPatient);
    });
  }

  /**
   * Encuentra todos los pacientes activos de la EEQ en el sistema.
   * @returns 
   */
  async find(): Promise<FlatEEQPatient[]> {
    const patients = await this.repository.query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status ', { status: true })
      .leftJoinAndSelect('user.extraAttributes', 'extraAttribute')
      .leftJoin('user.extraAttributes', 'extraAttribute2', 'extraAttribute2.name = :name2 AND extraAttribute2.value = :value2', { name2: this.companyName, value2: this.companyValue })
      .where('extraAttribute.name = :name1', { name1: this.roleKey })
      .getMany();

    const flatten = await Promise.all(patients.map(this.flatPatient));
    return flatten.filter(e => !!e);
  }

  /**
   * Encuentra todos los pacientes activos del sistema usando paginacion y filtros.
   * @returns 
   */
  async findByFilterAndPagination(
    page: number = 0,
    limit: number = 300,
    filter: string = "",
    order: GETPatientOrderedRequestDto
  ): Promise<FlatEEQPatient[]> {
    const query = this.repository.query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status ', { status: true })
      .leftJoinAndSelect('user.extraAttributes', 'extraAttribute')
      .leftJoin('user.extraAttributes', 'extraAttribute2', 'extraAttribute2.name = :name2 AND extraAttribute2.value = :value2', { name2: this.companyName, value2: this.companyValue })
      .where('user.name LIKE :filter OR user.lastname LIKE :filter OR user.email LIKE :filter OR user.dni LIKE :filter OR extraAttribute.value LIKE :filter', { filter: `%${filter}%` })
      .andWhere('extraAttribute.name = :name1', { name1: this.roleKey });

    if (order) {
      query.orderBy(`user.${order.key}`, order.order);
    }

    const patients = await query.take(limit).skip(page).getMany();
    const flatten = await Promise.all(patients.map(this.flatPatient));
    return flatten.filter(e => !!e);
  }

  /**
   * Encuentra el numero de paginas de un filtro dado.
   * @returns 
   */
  async findByPageCount(
    limit: number = 300,
    filter: string = ""
  ): Promise<number> {
    const count = await this.repository.query('patient')
      .leftJoinAndSelect('patient.user', 'user', 'user.status = :status ', { status: true })
      .leftJoinAndSelect('user.extraAttributes', 'extraAttribute')
      .leftJoin('user.extraAttributes', 'extraAttribute2', 'extraAttribute2.name = :name2 AND extraAttribute2.value = :value2', { name2: this.companyName, value2: this.companyValue })
      .where('user.name LIKE :filter OR user.lastname LIKE :filter OR user.email LIKE :filter OR user.dni LIKE :filter OR extraAttribute.value LIKE :filter', { filter: `%${filter}%` })
      .andWhere('extraAttribute.name = :name1', { name1: this.roleKey })
      .getCount();
    return Math.floor(count / limit);
  }
}

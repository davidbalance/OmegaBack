import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../entities/patient.entity';
import { PatientRepository } from '../patient.repository';
import { Like } from 'typeorm';
import { GETPatientOrderedRequestDto } from '../dtos/patient.request.dto';

@Injectable()
export class PatientService {

  constructor(
    @Inject(PatientRepository) private readonly repository: PatientRepository) { }

  /**
   * Encuentra todos los pacientes activos del sistema.
   * @returns 
   */
  async find(): Promise<Patient[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          status: true
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: {
          id: true,
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      },
      cache: 1000 * 900
    });
    return patients;
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
  ): Promise<Patient[]> {
    const orderBy = order ? { user: { [order.key]: order.order } } : undefined;
    const patients = await this.repository.find({
      where: {
        user: [
          { status: true, name: Like(`%${filter}%`) },
          { status: true, lastname: Like(`%${filter}%`) },
          { status: true, email: Like(`%${filter}%`) },
          { status: true, dni: Like(`%${filter}%`) }
        ],
      },
      order: orderBy,
      take: limit,
      skip: page * limit
    })
    return patients;
  }

  /**
   * Encuentra el numero de paginas de un filtro dado.
   * @returns 
   */
  async findByPageCount(
    limit: number = 300,
    filter: string = ""
  ): Promise<number> {
    const count = await this.repository.count({
      where: {
        user: [
          { status: true, name: Like(`%${filter}%`) },
          { status: true, lastname: Like(`%${filter}%`) },
          { status: true, email: Like(`%${filter}%`) },
          { status: true, dni: Like(`%${filter}%`) }
        ],
      }
    });
    return Math.floor(count / limit);
  }

  /**
   * Encuentra a todos los pacientes que compartan un atributo externo.
   * @param name 
   * @param value 
   * @returns 
   */
  async findByExtraAttribute(name: string, value: string): Promise<Patient[]> {
    const patients = await this.repository.find({
      where: {
        user: {
          extraAttributes: {
            name: name,
            value: value
          },
          status: true,
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: {
          id: true,
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      },
      cache: 1000 * 900
    });
    return patients;
  }

  /**
   * Encuentra un paciente por su dni.
   * @param dni 
   * @returns 
   */
  async findOneByDni(dni: string): Promise<Patient> {
    const patient = await this.repository.findOne({
      where: {
        user: {
          dni: dni
        }
      },
      select: {
        id: true,
        birthday: true,
        gender: true,
        user: {
          id: true,
          dni: true,
          email: true,
          lastname: true,
          name: true
        }
      },
      cache: 1000 * 900
    });
    return patient;
  }
}

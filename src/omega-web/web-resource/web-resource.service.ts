import { Inject, Injectable } from '@nestjs/common';
import { WebResourceRespository } from './web-resource.repository';
import { WebResource } from './entities/web-resource.entity';
import { In } from 'typeorm';
import { PATCHWebResourceRequestDto, POSTWebResourceRequestDto } from './dto/web-resource.request.dto';

@Injectable()
export class WebResourceService {
  constructor(
    @Inject(WebResourceRespository) private readonly repository: WebResourceRespository
  ) { }

  /**
   * Encuentra una serie de recursos web en base al arreglo de nombres solicitado.
   * @param names 
   * @returns 
   */
  async findInNames(names: string[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { name: In(names) } });
    return resources;
  }

  /**
   * Encuentra una serie de recursos web en base al arreglo de identificadores unicos proporcionado.
   * @param ids 
   * @returns 
   */
  async findInIds(ids: number[]): Promise<WebResource[]> {
    const resources = await this.repository.find({ where: { id: In(ids) } });
    return resources;
  }

  /**
   * Encuentra todos los recursos del sistema.
   * @returns 
   */
  async findShowAndActiveResources(): Promise<WebResource[]> {
    const resources = await this.repository.find({
      where: {
        show: true,
        status: true
      }
    });
    return resources;
  }

  /**
   * Encuentra los recursos web marcados como visibles.
   * @returns 
   */
  async findAll(): Promise<WebResource[]> {
    const resources = await this.repository.find({ order: { status: 'DESC' } });
    return resources;
  }

  /**
   * Crea un recurso web.
   * @param data 
   * @returns 
   */
  async create(data: POSTWebResourceRequestDto): Promise<WebResource> {
    const resource = await this.repository.create(data);
    return resource;
  }

  /**
   * Actualiza un recurso web.
   * @param id 
   * @param data 
   * @returns 
   */
  async update(id: number, data: PATCHWebResourceRequestDto): Promise<WebResource> {
    const resource = await this.repository.findOneAndUpdate({ id }, { ...data });
    return resource;
  }

  /**
   * Elimina un recurso web.
   * @param id 
   */
  async delete(id: number): Promise<void> {
    await this.repository.findOneAndDelete({ id });
  }
}

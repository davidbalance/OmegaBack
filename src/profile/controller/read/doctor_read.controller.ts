import { Controller, Get, Param, Query, Res, StreamableFile, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { InjectQuery } from "@omega/profile/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { UserFindManyQueryDto } from "../dto/query/user_query.dto";
import { DoctorGetFileQuery } from "@omega/profile/application/query/user/doctor-get-file.query";
import { DoctorFindOneByDniQuery } from "@omega/profile/application/query/user/doctor-find-one-by-dni.query";
import { DoctorFindOptionsQuery } from "@omega/profile/application/query/user/doctor-find-options.query";
import { DoctorFindManyQuery } from "@omega/profile/application/query/user/doctor-find-many.query";
import { DoctorFindOneQuery } from "@omega/profile/application/query/user/doctor-find-one.query";
import { DoctorModelMapper } from "../mapper/doctor_model.mapper";
import { DoctorManyResponseDto, DoctorOptionResponseDto, DoctorResponseDto } from "../dto/response/doctor.dto";
import { Response } from "express";

@ApiTags('Profile', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('doctors')
export class DoctorReadController {
    constructor(
        @InjectQuery('DoctorFindOne') private readonly findOneQuery: DoctorFindOneQuery,
        @InjectQuery('DoctorFindOneByDni') private readonly findOneByDniQuery: DoctorFindOneByDniQuery,
        @InjectQuery('DoctorFindMany') private readonly findManyQuery: DoctorFindManyQuery,
        @InjectQuery('DoctorFindOptions') private readonly findOptionsQuery: DoctorFindOptionsQuery,
        @InjectQuery('DoctorGetFile') private readonly getFile: DoctorGetFileQuery,
    ) { }

    @Get('user/:userId')
    async findOne(
        @Param('userId') userId: string
    ): Promise<DoctorResponseDto> {
        const value = await this.findOneQuery.handleAsync({ userId });
        const data = DoctorModelMapper.toDTO(value);
        return plainToInstance(DoctorResponseDto, data);
    }

    @Get('dni/:userDni')
    async findOneByDni(
        @Param('userDni') userDni: string
    ): Promise<DoctorResponseDto> {
        const value = await this.findOneByDniQuery.handleAsync({ userDni });
        const data = DoctorModelMapper.toDTO(value);
        return plainToInstance(DoctorResponseDto, data);
    }

    @Get()
    async findMany(
        @Query() query: UserFindManyQueryDto,
    ): Promise<DoctorManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({ ...query });
        const data = value.data.map(e => DoctorModelMapper.toDTO(e));
        return plainToInstance(DoctorManyResponseDto, { ...value, data });
    }

    @Get('options')
    async findOptions(): Promise<DoctorOptionResponseDto[]> {
        const data = await this.findOptionsQuery.handleAsync();
        return plainToInstance(DoctorOptionResponseDto, data);
    }

    @Get('file/:userId')
    async findFile(
        @Param('userId') userId: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const data = await this.getFile.handleAsync({ userId });
        response.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment;filename="firma.png"'
        });
        return new StreamableFile(data);
    }
}
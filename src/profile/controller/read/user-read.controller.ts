import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserFindManyQuery } from "@omega/profile/application/query/user/user-find-many.query";
import { InjectQuery } from "@omega/profile/nest/inject/query.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { plainToInstance } from "class-transformer";
import { UserFindManyQueryDto } from "../dto/query/user-query.dto";
import { UserAuthResourceResponseDto, UserManyResponseDto, UserResponseDto } from "../dto/response/user.dto";
import { UserModelMapper } from "../mapper/user-model.mapper";
import { UserAttributeFindOneQuery } from "@omega/profile/application/query/user/user-attribute-find-one.query";
import { UserAttributeResponseDto } from "../dto/response/user-attribute.dto";
import { UserFindOneQuery } from "@omega/profile/application/query/user/user-find-one.query";
import { UserFindManyResourcesQuery } from "@omega/profile/application/query/user/user-find-many-resources.query";
import { UserAuthResourceMapper } from "../mapper/user-auth-resource.mapper";

@ApiTags('Profile', 'Read')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserReadController {
    constructor(
        @InjectQuery('UserFindMany') private readonly findManyQuery: UserFindManyQuery,
        @InjectQuery('UserFindOne') private readonly findOneQuery: UserFindOneQuery,
        @InjectQuery('UserFindManyResources') private readonly findManyResourcesQuery: UserFindManyResourcesQuery,
        @InjectQuery('UserAttributeFindOne') private readonly findOneAttributeQuery: UserAttributeFindOneQuery,
    ) { }

    @Get()
    async findMany(
        @Query() query: UserFindManyQueryDto
    ): Promise<UserManyResponseDto> {
        const value = await this.findManyQuery.handleAsync({
            ...query, order: query.orderField && query.orderValue ? {
                [query.orderField]: query.orderValue
            } : undefined
        });
        const data = value.data.map(e => UserModelMapper.toDTO(e));
        return plainToInstance(UserManyResponseDto, { ...value, data });
    }

    @Get(':userId')
    async findOne(
        @Param('userId') userId: string
    ): Promise<UserResponseDto> {
        const value = await this.findOneQuery.handleAsync({ userId });
        const data = UserModelMapper.toDTO(value);
        return plainToInstance(UserResponseDto, data);
    }

    @Get(':userId/resources')
    async findManyResources(
        @Param('userId') userId: string
    ): Promise<UserAuthResourceResponseDto[]> {
        const values = await this.findManyResourcesQuery.handleAsync({ userId });
        const data = values.map(e => UserAuthResourceMapper.toDTO(e));
        return plainToInstance(UserAuthResourceResponseDto, data);
    }

    @Get(':userId/attribute/:attributeName')
    async findOptions(
        @Param('userId') userId: string,
        @Param('attributeName') attributeName: string,
    ): Promise<UserAttributeResponseDto> {
        const data = await this.findOneAttributeQuery.handleAsync({ userId, attributeName });
        return plainToInstance(UserAttributeResponseDto, data);
    }
}
import { ObjectArrayResponse } from '@/shared/utils/bases/base.object-array.interface';
import { Expose, Type } from 'class-transformer';
import { WebResourceResponseDto } from './base.web-resource.response.dto';

export class GetWebResourceArrayResponseDto implements ObjectArrayResponse<WebResourceResponseDto> {
    @Type(() => WebResourceResponseDto)
    @Expose() public readonly data: WebResourceResponseDto[];
}

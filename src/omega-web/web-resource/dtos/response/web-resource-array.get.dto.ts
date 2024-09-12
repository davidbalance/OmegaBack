import { ObjectArrayResponse } from '@/shared/utils/bases/base.object-array.interface';
import { Expose, Type } from 'class-transformer';
import { WebResource } from './web-resource.base.dto';

export class GetWebResourceArrayResponseDto implements ObjectArrayResponse<WebResource> {
    @Type(() => WebResource)
    @Expose() public readonly data: WebResource[];
}

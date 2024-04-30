import { Expose, Type } from "class-transformer";

class ACClientRole {
    @Expose()
    id: number;
    @Expose()
    name: string;
}

class ACClientResource {
    @Expose()
    id: number;
    @Expose()
    name: string;
}

export class FindOneACClient {
    @Expose()
    @Type(() => ACClientResource)
    public resources: ACClientResource[];
    
    @Expose()
    @Type(() => ACClientRole)
    public roles: ACClientRole[];
}

export class FindOneACClientAndUpdateRolesResponseDTO { }
export class FindOneACClientAndUpdateResourcesResponseDTO { }
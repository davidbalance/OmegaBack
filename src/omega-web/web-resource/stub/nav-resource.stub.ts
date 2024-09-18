import { NavResource } from "../dtos/response/nav-resource.base.dto";

const stubNavResource = (id: number): NavResource => ({
    id: id,
    label: "Stub label",
});

export const mockNavResource = () => stubNavResource(1);
export const mockNavResources = () => Array(10).map(stubNavResource);
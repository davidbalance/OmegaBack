import { ExtendedManagement } from "../dtos/response/extended-management.base.dto";

const stubExtendedManagement = (id: number): ExtendedManagement => ({
    id: id,
    name: "Stub name"
});

export const mockExtendedManagement = () => stubExtendedManagement(1);
export const mockExtendedManagements = () => [1, 2, 3, 4, 5].map(stubExtendedManagement);
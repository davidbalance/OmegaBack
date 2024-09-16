import { ExtendedManagement } from "../dtos/response/extended-management.base.dto";

const stubExtendedArea = (id: number) => ({
    id: id,
    name: 'Stub name'
})
const stubExtendedManagement = (id: number): ExtendedManagement => ({
    id: id,
    name: "Stub name",
    areas: Array(10).map(stubExtendedArea)
});

export const mockExtendedManagement = () => stubExtendedManagement(1);
export const mockExtendedManagements = () => [1, 2, 3, 4, 5].map(stubExtendedManagement);
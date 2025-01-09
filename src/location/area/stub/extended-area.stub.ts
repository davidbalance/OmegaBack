const stubExtendedArea = (id: number) => ({
    id: id,
    name: 'Stub name'
})

export const mockExtendedArea = () => stubExtendedArea(1);
export const mockExtendedAreas = () => [1, 2, 3, 4, 5].map(stubExtendedArea);
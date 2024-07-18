import { ISelectorOption } from "@/shared/utils/bases/base.selector";

const stubGroup = (id: number): ISelectorOption<number> => ({
    key: id,
    label: 'my-stub-option'
});

export const mockDiseaseGroupOptions = () => [1, 2, 3, 4, 5].map(stubGroup);
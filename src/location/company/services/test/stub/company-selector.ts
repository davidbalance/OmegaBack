import { ISelectorOption } from "@/shared/utils/bases/base.selector";

const stubCompanySelector = (id: number): ISelectorOption<number> => ({
    key: id,
    label: 'my-stub-key'
});


export const mockCompanySelectorOptions = () => [1, 2, 3, 4, 5].map(stubCompanySelector);
import { SelectorOption } from "@/shared/utils/bases/base.selector";

const stubCitySelector = (id: number): SelectorOption<number> => ({
    key: id,
    label: 'my-stub-key'
});


export const mockCitySelectorOptions = () => [1, 2, 3, 4, 5].map(stubCitySelector);
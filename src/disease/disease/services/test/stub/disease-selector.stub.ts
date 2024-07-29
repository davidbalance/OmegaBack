import { mockDiseaseGroup } from "@/disease/disease-group/services/test/stub/disease-group.stub";
import { Disease } from "@/disease/disease/entities/disease.entity";
import { ISelectorOption } from "@/shared/utils/bases/base.selector";

const stubDiseaseSelector = (key: number): ISelectorOption<number> => ({
    key: key,
    label: "my-stub-label"
});

export const mockDiseaseSelectorOptions = () => [1, 2, 3, 4, 5].map(stubDiseaseSelector);
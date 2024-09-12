import { CityEntity } from "@/location/city/entities/city.entity";

const stubCity = (id: number): CityEntity => ({
    id: id,
    name: "my-stub-name",
    branches: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockCity = () => stubCity(1);
export const mockCities = () => [1, 2, 3, 4, 5].map(stubCity);
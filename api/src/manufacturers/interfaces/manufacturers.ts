import { Manufacturer } from "src/utils/typeorm/entities/Manufacturer/Manufacturer";

export interface IManufacturerService {
    // manufacturers
    createDummyManufacturers(): Promise<Manufacturer[]>;
    fetchAllManufacturers(): Promise<Manufacturer[]>;
}

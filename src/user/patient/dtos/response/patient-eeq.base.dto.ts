import { Expose } from "class-transformer";
import { Patient } from "./patient.base.dto";

export class PatientEeq extends Patient {
    @Expose() public readonly role: string;
}
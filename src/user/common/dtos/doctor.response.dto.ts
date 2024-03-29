import { Doctor } from "@/user/doctor/entities/doctor.entity";
import { FindUserBase } from ".";

export class FindDoctor
    extends FindUserBase
    implements Omit<Doctor, 'id' | 'user' | 'createAt' | 'updateAt'> {
    public readonly signature: string;
}

export class CreateDoctorResponseDTO {
    public readonly doctor: number;
}

export class FindDoctorsResponseDTO {
    public readonly doctors: FindDoctor[];
}

export class FindOneDoctorResponseDTO {
    public readonly doctor: FindDoctor;
}

export class FindOneDoctorAndUpdateResponseDTO { }
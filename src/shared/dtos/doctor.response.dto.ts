import { Doctor } from "@/user/doctor/entities/doctor.entity";

export class CreateDoctorResponseDTO { }

export class FindDoctorResponseDTO {
    public readonly doctors: Doctor[]
}

export class FindOneDoctorResponseDTO {
    public readonly doctor: Doctor;
}

export class UpdateDoctorResponseDTO { }
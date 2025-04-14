export type CreatePatientPayload = {
    userId: string;
    gender: "male" | "female";
    birthday: Date;
}
import { ClientCreateRequestDto } from "../dto/request/client.dto";
import { validate } from "class-validator";
import { BadRequestException } from "@nestjs/common";

export class ClientMassiveLoadSpreadSheetValidator {

    public static async validate(value: ClientCreateRequestDto): Promise<void> {
        const errors = await validate(value);
        if (errors.length) {
            throw new BadRequestException(errors);
        }
    }
}
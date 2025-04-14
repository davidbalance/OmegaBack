import { validate } from "class-validator";
import { BadRequestException } from "@nestjs/common";
import { OrderMassiveLoadRequestDto } from "../dto/request/order.dto";

export class OrderMassiveLoadSpreadSheetValidator {

    public static async validate(value: OrderMassiveLoadRequestDto): Promise<void> {
        const errors = await validate(value);
        if (errors.length) {
            throw new BadRequestException(errors);
        }
    }
}
import { ZodObject, ZodRawShape } from "zod";

export function ZodValidatorFactory<T extends ZodRawShape>(schema: ZodObject<T>) {
    return (value: unknown) => {
        const result = schema.safeParse(value)
        if (!result.success) {
            throw new Error(`Invalid configuration: ${JSON.stringify(result.error.errors)}`);
        }
        return result.data;
    }
}
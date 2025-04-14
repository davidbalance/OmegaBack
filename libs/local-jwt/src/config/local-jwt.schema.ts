import { z } from "zod";

const schema = z.object({
    JWT_ACCESS_SECRET: z.coerce.string().nonempty(),
    JWT_ACCESS_EXPIRES_IN: z.coerce.number().min(300),
    JWT_REFRESH_SECRET: z.coerce.string().nonempty(),
    JWT_REFRESH_EXPIRES_IN: z.coerce.number().min(3600)
});

export default schema;
import { z } from "zod";

const schema = z.object({
    NODE_ENV: z.coerce.string().refine(val => ['production', 'development'].includes(val)),
    PORT: z.coerce.number().int().min(1),
    NETWORK: z.coerce.string().nonempty()
});

export default schema;
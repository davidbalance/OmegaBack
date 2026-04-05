import { z } from "zod";

const schema = z.object({
    RECORD_FEMO_TEMPLATE: z.coerce.string(),
    RECORD_CERTIFICATE_TEMPLATE: z.coerce.string(),
});

export default schema;
import { z } from "zod";

const schema = z.object({
    HTML_TEMPLATE_PATH: z.coerce.string().nonempty()
});

export default schema;
import { object, string } from "yup";

const shortUrlSchema = object({
    body: object({
        destination: string().url("Destination must be a valid URL").required("Destination is required")
    }).required("Body cannot be empty").noUnknown(true, "Only destination field is allowed"),
});

export default shortUrlSchema;

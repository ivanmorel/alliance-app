import * as yup from "yup";

export const createOrEditValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Must be less than 50 characters")
    .required("Name is required"),
  notes: yup
    .string()
    .max(500, "Must be less than 300 characters")
    .required("Description is required"),
  address: yup.object().required("Location is required"),
});

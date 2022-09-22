import * as yup from "yup";

export const schemaRegister = yup.object().shape({
  username: yup
    .string()
    .min(4, "Please enter at least 4 characters")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(6, "Please enter at least 6 characters")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Required"),
});

export const schemaLogin = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(6, "Please enter at least 6 characters")
    .required("Required"),
});

import * as yup from "yup";
import { parse, format } from "date-fns";

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

export const schemaEditProfile = yup.object().shape({
  city: yup.string().required("Required"),
  from: yup.string().required("Required"),
  description: yup.string().required("Required"),
  birthday: yup
    .date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "dd/MM/yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .min(10, "Please enter a valid date(dd/mm/yyyy)")
    .max(
      format(new Date(Date.now()), "dd/MM/yyyy"),
      "The date of birth cannot be greater than the current date"
    )
    .required("Required"),
  gender: yup
    .string()
    .matches(/(Nam|Nữ|Male|Female)/, "Gender must be male or female")
    .required("Required"),
});

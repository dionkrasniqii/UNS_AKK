import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  Username: Yup.string()
    .min(3, "Username duhet te jete i gjate se paku 3 karaktere")
    .required("Ju lutemi mbushni username-in"),
  Password: Yup.string().required("Ju lutemi mbushni fjalekalimin"),
});

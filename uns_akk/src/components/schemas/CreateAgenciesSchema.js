import * as Yup from "yup";

export const CreateAgenciesSchema = Yup.object().shape({
    Name: Yup.string()
    .required("Ju lutem mbushni emrin e institucionit!"),
})
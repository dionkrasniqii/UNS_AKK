import * as Yup from "yup";

export const CreateAgenciesSchema = Yup.object().shape({
  Name: Yup.string().required(
    "Ju lutem mbushni fushën për emrin e institucionit!"
  ),
  UniqueNumber: Yup.number()
    .test(
      "is-valid",
      "Numri unik duhet te permbaj 9 numra gjithsej dhe te filloj me numrin 8",
      (value) => /^8\d{8}$/.test(value)
    )
    .required("Ju lutem mbushni fushën për numrin unik!"),
  City: Yup.string().required("Ju lutem mbushni fushën për qytetin!"),
  Address: Yup.string().required("Ju lutem mbushni fushën për adresën!"),
  PostalCode: Yup.string().required(
    "Ju lutem mbushni fushën për kodin postal!"
  ),
  PhoneNumber: Yup.string().required(
    "Ju lutem mbushni fushën për numrin e telefonit!"
  ),
  Email: Yup.string().required("Ju lutem mbushni fushën për email!"),
  Web: Yup.string().required("Ju lutem mbushni fushën për faqen e internetit!"),
  Documents: Yup.string().required(
    "Ju lutem mbushni fushën për ngarkimin e dokumentit!"
  ),
});

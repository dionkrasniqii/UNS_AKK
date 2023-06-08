import * as Yup from "yup";

export const CreateQualificationsSchema = Yup.object().shape({
  CodeAL: Yup.string().required(
    "Ju lutem mbushni fushën për kodin ne gjuhen shqipe!"
  ),
  CodeEN: Yup.string().required(
    "Ju lutem mbushni fushën për kodin ne gjuhen angleze!"
  ),
  CodeSR: Yup.string().required(
    "Ju lutem mbushni fushën për kodin ne gjuhen serbe!"
  ),
  QualificationNameAL: Yup.string().required(
    "Ju lutem mbushni fushën për kualifikimin ne gjuhen shqipe!"
  ),
  QualificationNameEN: Yup.string().required(
    "Ju lutem mbushni fushën për kualifikimin ne gjuhen angleze!"
  ),
  QualificationNameSR: Yup.string().required(
    "Ju lutem mbushni fushën për kualifikimin ne gjuhen serbe!"
  ),
  LevelKKKId: Yup.string().required("Ju lutem mbushni fushën për levelin!"),
});

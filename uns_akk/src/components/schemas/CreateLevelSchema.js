import * as Yup from "yup";

export const CreateLevelSchema = Yup.object().shape({
  Type: Yup.string().required("Ju lutem tregoni se çfarë kategorie është leveli!"),
  LevelReferenceKEK: Yup.string().required("Ju lutem referenconi levelin KEK"),
  LevelDescription: Yup.string().required("Ju lutem shkruani një përshkrim të nivelit!"),
  Competencies: Yup.string().required("Ju lutem shkruani kompetencat!"),
  DetailedDescription: Yup.string().required("Ju lutem shkruani një përshkrim të detajuar për nivelin!"),
  Knowledge: Yup.string().required("Ju lutem shkruani njohuritë!"),
  LevelIndicator: Yup.string().required("Ju lutem shkruani indikatorin e nivelit!"),
  Skills: Yup.string().required("Ju lutem shkruani aftësitë!"),
  Descriptor: Yup.string().required("Ju lutem shkruani përshkrimin!"),
});

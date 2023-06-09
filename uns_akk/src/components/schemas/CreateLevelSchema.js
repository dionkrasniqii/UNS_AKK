import * as Yup from "yup";

export const CreateLevelSchema = Yup.object().shape({
  Type: Yup.string().max(50).required("Ju lutem tregoni se çfarë kategorie është leveli!"),
  LevelReferenceKEK: Yup.string().max(450).required("Ju lutem referenconi levelin KEK"),
  LevelDescription: Yup.string().max(200).required("Ju lutem shkruani një përshkrim të nivelit!"),
  Competencies: Yup.string().max(1000).required("Ju lutem shkruani kompetencat!"),
  DetailedDescription: Yup.string().max(300).required("Ju lutem shkruani një përshkrim të detajuar për nivelin!"),
  Knowledge: Yup.string().max(1000).required("Ju lutem shkruani njohuritë!"),
  LevelIndicator: Yup.string().max(1000).required("Ju lutem shkruani indikatorin e nivelit!"),
  Skills: Yup.string().max(1000).required("Ju lutem shkruani aftësitë!"),
  TheDescriptor: Yup.string().max(1000).required("Ju lutem shkruani përshkrimin!"),
});


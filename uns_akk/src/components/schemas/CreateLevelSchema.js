import * as Yup from "yup";

export const CreateLevelSchema = Yup.object().shape({
  Type: Yup.string().required("Ju lutem tregoni se çfarë kategorie është leveli!"),
  
  LevelReferenceKEK: Yup.string().required("Ju lutem referenconi levelin KEK"),
  
  LevelIndicators: Yup.string().required("Ju lutem tregoni indikatoret e këtij leveli"),
  
  DetailedDescription: Yup.string().required("Ju lutem shkruani një përshkrim të detajuar për levelin"),
  
  TheDescriptor: Yup.string().required("Ju lutem shkruani Emrin e plotë të përshkruarit"),
  
  Knowledge: Yup.string().required("Ju lutem shkruani njohurit"),
  
  Skills: Yup.string().required("Ju lutem shkruani aftësitë"),
  
  Competencies: Yup.string().required("Ju lutem shkruani kompetencat")
});

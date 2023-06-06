import * as Yup from "yup";

export const CreateLevelSchema = Yup.object().shape({
  TypeAl: Yup.string().required("Ju lutem tregoni se çfarë kategorie është leveli!"),
  TypeEn: Yup.string().required("Please specify the category of the level!"),
  TypeSr: Yup.string().required("Molimo vas da odredite kategoriju nivoa!"),

  LevelReferenceKEK: Yup.string().required("Ju lutem referenconi levelin KEK"),

  LevelDescriptionAl: Yup.string().required("Ju lutem shkruani një përshkrim të nivelit (AL)!"),
  LevelDescriptionEn: Yup.string().required("Please provide a description of the level (EN)!"),
  LevelDescriptionSr: Yup.string().required("Molimo vas da navedete opis nivoa (SR)!"),

  CompetenciesAl: Yup.string().required("Ju lutem shkruani kompetencat (AL)!"),
  CompetenciesEn: Yup.string().required("Please provide the competencies (EN)!"),
  CompetenciesSr: Yup.string().required("Molimo vas da navedete kompetencije (SR)!"),

  DetailedDescriptionAl: Yup.string().required("Ju lutem shkruani një përshkrim të detajuar për nivelin (AL)!"),
  DetailedDescriptionEn: Yup.string().required("Please provide a detailed description of the level (EN)!"),
  DetailedDescriptionSr: Yup.string().required("Molimo vas da navedete detaljan opis nivoa (SR)!"),

  KnowledgeAl: Yup.string().required("Ju lutem shkruani njohuritë (AL)!"),
  KnowledgeEn: Yup.string().required("Please provide the knowledge (EN)!"),
  KnowledgeSr: Yup.string().required("Molimo vas da navedete znanje (SR)!"),

  LevelIndicatorAl: Yup.string().required("Ju lutem shkruani indikatorin e nivelit (AL)!"),
  LevelIndicatorEn: Yup.string().required("Please provide the level indicator (EN)!"),
  LevelIndicatorSr: Yup.string().required("Molimo vas da navedete indikator nivoa (SR)!"),

  SkillsAl: Yup.string().required("Ju lutem shkruani aftësitë (AL)!"),
  SkillsEn: Yup.string().required("Please provide the skills (EN)!"),
  SkillsSr: Yup.string().required("Molimo vas da navedete veštine (SR)!"),

  DescriptorAl: Yup.string().required("Ju lutem shkruani përshkrimin (AL)!"),
  DescriptorEn: Yup.string().required("Please provide the descriptor (EN)!"),
  DescriptorSr: Yup.string().required("Molimo vas da navedete opis (SR)!"),
});

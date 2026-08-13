import exampleUser from "../exampleUser";
import Screen from "../Screen";
import TipCardTemplate from "./formTemplates/TipCardTemplate";
import LevelFieldTemplate from "./formTemplates/LevelFieldTemplate";
import DateRangeFieldTemplate from "./formTemplates/DateRangeFieldTemplate";
import DateFieldTemplate from "./formTemplates/DateFieldTemplate";
import TextFieldTemplate from "./formTemplates/TextFieldTemplate";
import ImageFieldTemplate from "./formTemplates/ImageFieldTemplate";
import EmailFieldTemplate from "./formTemplates/EmailFieldTemplate";
import TelFieldTemplate from "./formTemplates/TelFieldTemplate";
import URLFieldTemplate from "./formTemplates/URLFieldTemplate";
import ListFieldTemplate from "./formTemplates/ListFieldTemplate";
import AddItemTemplate from "./formTemplates/AddItemTemplate";
import RemoveItemTemplate from "./formTemplates/RemoveItemTemplate";
import FormTemplate from "./formTemplates/FormTemplate";
import SectionTemplate from "./formTemplates/SectionTemplate";
import UserIcon from "../../assets/images/UserIcon.svg?react";
import LinkedInIcon from "../../assets/images/LinkedInIcon.svg?react";
import ContactIcon from "../../assets/images/ContactIcon.svg?react";
import GithubIcon from "../../assets/images/githubLogo.svg?react";
import WebSiteIcon from "../../assets/images/webSiteIcon.svg?react";
import ToolsIcon from "../../assets/images/ToolsIcon.svg?react";
import BriefcaseIcon from "../../assets/images/BriefcaseIcon.svg?react";
import FlaskIcon from "../../assets/images/FlaskIcon.svg?react";
import TrophyIcon from "../../assets/images/TrophyIcon.svg?react";
import AwardIcon from "../../assets/images/AwardIcon.svg?react";
import LightBulbIcon from "../../assets/images/LightBulbIcon.svg?react";
import IntellectIcon from "../../assets/images/intellect.svg?react";
import StudentIcon from "../../assets/images/StudentIcon.svg?react";
import NotebookIcon from "../../assets/images/Notebook.svg?react";
import PlantIcon from "../../assets/images/PlantIcon.svg?react";

const getTemplateIdObject = ({ templateId }) => ({ templateId });

/* 
person
----------------------------------------------------------------------------
*/

const nameField = new TextFieldTemplate({
  templateId: "name",
  label: "Nombres",
  placeholder: "Flora",
  exampleValue: exampleUser.name,
});

const lastNameField = new TextFieldTemplate({
  templateId: "lastName",
  label: "Apellidos",
  placeholder: "Flores",
  exampleValue: exampleUser.lastName,
});

const titleField = new TextFieldTemplate({
  templateId: "tittle",
  label: "Titulo",
  placeholder: "Escritora",
  exampleValue: exampleUser.title,
});

const descriptionField = new TextFieldTemplate({
  templateId: "description",
  label: "Descripción",
  placeholder: "Hola soy Flora Flores, escritora de ciencia ficción",
  exampleValue: exampleUser.description,
});

const avatarField = new ImageFieldTemplate({
  templateId: "avatar",
  primaryActionLabel: "Cargar avatar",
  destructiveActionLabel: "Eliminar avatar",
  alt: "Tu imagen de perfil",
  label: "Avatar",
  exampleValue: exampleUser.avatar,
});

const personForm = new FormTemplate({
  templateId: "personForm",
  name: "Datos personales",
  Icon: UserIcon,
  value: [
    nameField,
    lastNameField,
    titleField,
    descriptionField,
    avatarField,
  ].map(getTemplateIdObject),
});

/* 
contact
----------------------------------------------------------------------------
*/

const mailField = new EmailFieldTemplate({
  templateId: "mail",
  exampleValue: exampleUser.mail,
});

const phoneNumberField = new TelFieldTemplate({
  templateId: "phoneNumber",
  exampleValue: exampleUser.phoneNumber,
});

const addressField = new TextFieldTemplate({
  templateId: "address",
  placeholder: "Del parque central, 3 cuadras al norte",
  label: "Dirección",
  tip: "Escriba la dirección donde se le pueda encontrar",
  exampleValue: exampleUser.address,
});

const userField = new TextFieldTemplate({
  templateId: "user",
  label: "Usuario",
  placeholder: "Flora Flores",
  tip: "Escriba su nombre de usuario",
});

const webSiteNameField = new TextFieldTemplate({
  templateId: "webSiteName",
  label: "Nombre",
  placeholder: "El blog de flora",
  tip: "Escriba el nombre de su pagina web",
});

const urlField = new URLFieldTemplate({ templateId: "url" });

const linkedInSection = new SectionTemplate({
  templateId: "linkedIn",
  Icon: LinkedInIcon,
  name: "LinkedIn",
  value: [
    [userField, exampleUser.linkedIn.user],
    [urlField, exampleUser.linkedIn.URL],
  ].map(([{ templateId }, exampleValue]) => ({ templateId, exampleValue })),
});

const githubSection = new SectionTemplate({
  templateId: "github",
  Icon: GithubIcon,
  name: "Github",
  value: [
    [userField, exampleUser.github.user],
    [urlField, exampleUser.github.URL],
  ].map(([{ templateId }, exampleValue]) => ({ templateId, exampleValue })),
});

const webSiteSection = new SectionTemplate({
  templateId: "webSite",
  Icon: WebSiteIcon,
  name: "Sitio web",
  value: [
    [webSiteNameField, exampleUser.webSite.name],
    [urlField, exampleUser.webSite.URL],
  ].map(([{ templateId }, exampleValue]) => ({ templateId, exampleValue })),
});

const contactForm = new FormTemplate({
  templateId: "contactForm",
  name: "Contacto",
  Icon: ContactIcon,
  value: [
    mailField,
    phoneNumberField,
    addressField,
    linkedInSection,
    githubSection,
    webSiteSection,
  ].map(getTemplateIdObject),
});

/* 
experience
----------------------------------------------------------------------------
*/

const projectNameField = new TextFieldTemplate({
  templateId: "projectName",
  label: "Nombre del proyecto",
  placeholder: "Renovación del arte del parque central",
  tip: "Escriba el nombre del proyecto en el que trabajó",
});

const projectDescriptionField = new TextFieldTemplate({
  templateId: "projectDescription",
  label: "Descripción",
  placeholder:
    "Me encargue del diseño, planificación y ejecución de la renovación del arte del parque",
  tip: "Escriba una breve descripción de su proyecto",
});

const roleField = new TextFieldTemplate({
  templateId: "role",
  placeholder: "Escritora",
  label: "Rol",
  tip: "Escriba el rol que desempeñó",
});

const dateRangeField = new DateRangeFieldTemplate({ templateId: "dateRange" });

const organizationField = new TextFieldTemplate({
  templateId: "organization",
  placeholder: "Acme S.A",
  label: "Organización",
  tip: "Escriba la organización para la que trabajó",
});

const tasksField = new ListFieldTemplate({
  templateId: "tasks",
  label: "Tareas",
  placeholder: "Diseñar paleta de colores",
  primaryActionLabel: "Agregar tarea",
});

const createProjectValue = ({ name, description, role, dateRange } = {}) => {
  return [
    { templateId: projectNameField.templateId, value: name },
    { templateId: projectDescriptionField.templateId, value: description },
    { templateId: roleField.templateId, value: role },
    { templateId: dateRangeField.templateId, value: dateRange },
  ];
};

const removeProjectAction = new RemoveItemTemplate({
  templateId: "removeProjectAction",
  label: "Eliminar proyecto",
});

const projectSection = new SectionTemplate({
  templateId: "project",
  Icon: FlaskIcon,
  name: "Proyecto",
  value: createProjectValue(),
  actions: [removeProjectAction].map(getTemplateIdObject),
});

const createJobValue = ({ organization, role, dateRange, tasks } = {}) => {
  return [
    { templateId: organizationField.templateId, value: organization },
    { templateId: roleField.templateId, value: role },
    { templateId: dateRangeField.templateId, value: dateRange },
    { templateId: tasksField.templateId, value: tasks },
  ];
};

const removeJobAction = new RemoveItemTemplate({
  templateId: "removeJobAction",
  label: "Eliminar trabajo",
});

const jobSection = new SectionTemplate({
  templateId: "job",
  Icon: BriefcaseIcon,
  name: "Trabajo",
  value: createJobValue(),
  actions: [removeJobAction].map(getTemplateIdObject),
});

const exampleProjects = exampleUser.projects.map((item) => {
  return {
    templateId: projectSection.templateId,
    value: createProjectValue(item),
  };
});

const exampleJobs = exampleUser.jobs.map((item) => {
  return {
    templateId: jobSection.templateId,
    value: createJobValue(item),
  };
});

const addJobAction = new AddItemTemplate({
  templateId: "addJobAction",
  targetId: jobSection.templateId,
  Icon: jobSection.Icon,
  label: "Agregar trabajo",
});

const addProjectAction = new AddItemTemplate({
  templateId: "addProjectAction",
  targetId: projectSection.templateId,
  Icon: projectSection.Icon,
  label: "Agregar proyecto",
});

const experienceForm = new FormTemplate({
  templateId: "experienceForm",
  name: "Experiencia",
  Icon: ToolsIcon,
  value: [jobSection, projectSection].map(getTemplateIdObject),
  actions: [addJobAction, addProjectAction].map(getTemplateIdObject),
  exampleValue: [...exampleProjects, ...exampleJobs],
});

/* 
education
----------------------------------------------------------------------------
*/

const studyNameField = new TextFieldTemplate({
  templateId: "studyName",
  label: "Nombre del estudio",
  placeholder: "Arquitectura",
  tip: "Escriba el nombre del estudio que cursó",
});

const issuingOrganizationField = new TextFieldTemplate({
  templateId: "issuingOrganization",
  placeholder: "Acme S.A",
  label: "Nombre del emisor",
  tip: "Escriba el nombre de quien lo certifica",
});

const createEducationValue = ({
  issuingOrganization,
  study,
  dateRange,
} = {}) => {
  return [
    [issuingOrganizationField, issuingOrganization],
    [studyNameField, study],
    [dateRangeField, dateRange],
  ].map(([{ templateId }, value]) => ({ templateId, value }));
};

const removeStudyAction = new RemoveItemTemplate({
  templateId: "removeStudyAction",
  label: "Eliminar estudio",
});

const studySection = new SectionTemplate({
  templateId: "study",
  Icon: NotebookIcon,
  name: "Estudio",
  value: createEducationValue(),
  actions: [removeStudyAction].map(getTemplateIdObject),
});

const exampleStudies = exampleUser.studies.map((study) => {
  return {
    templateId: studySection.templateId,
    value: createEducationValue(study),
  };
});

const addStudyAction = new AddItemTemplate({
  templateId: "addStudyAction",
  targetId: studySection.templateId,
  Icon: studySection.Icon,
  label: "Agregar estudio",
});

const educationForm = new FormTemplate({
  templateId: "educationForm",
  name: "Educación",
  Icon: StudentIcon,
  value: [studySection].map(getTemplateIdObject),
  exampleValue: exampleStudies,
  actions: [addStudyAction].map(getTemplateIdObject),
});

/* 
awards
----------------------------------------------------------------------------
*/

const motiveField = new TextFieldTemplate({
  templateId: "motive",
  placeholder: "Alcanzar el 100% de las ventas",
  label: "Motivo del reconocimiento",
  tip: "Escriba porque recibe el reconocimiento",
});

const issuingDateField = new DateFieldTemplate({
  templateId: "issuingDate",
  label: "Fecha de emisión",
});

const createAwardValue = ({ issuingOrganization, motive, date } = {}) => {
  return [
    [issuingOrganizationField, issuingOrganization],
    [motiveField, motive],
    [issuingDateField, date],
  ].map(([{ templateId }, value]) => ({ templateId, value }));
};

const removeAwardAction = new RemoveItemTemplate({
  templateId: "removeAwardAction",
  label: "Eliminar reconocimiento",
});

const awardSection = new SectionTemplate({
  templateId: "award",
  Icon: AwardIcon,
  name: "Reconocimiento",
  value: createAwardValue(),
  actions: [removeAwardAction].map(getTemplateIdObject),
});

const exampleAwards = exampleUser.awards.map((item) => {
  return { templateId: awardSection.templateId, value: createAwardValue(item) };
});

const addAwardAction = new AddItemTemplate({
  templateId: "addAwardAction",
  targetId: awardSection.templateId,
  Icon: awardSection.Icon,
  label: "Agregar reconocimiento",
});

const awardsForm = new FormTemplate({
  templateId: "awardsForm",
  name: "Reconocimientos",
  Icon: TrophyIcon,
  value: [awardSection].map(getTemplateIdObject),
  actions: [addAwardAction].map(getTemplateIdObject),
  exampleValue: exampleAwards,
});

/* 
hardSkills
----------------------------------------------------------------------------
*/

const hardSkillsTipCard = new TipCardTemplate({
  templateId: "hardSkillTipCard",
  tip: `Para este proyecto una habilidad dura es una capacidad y/o conocimiento medible que se adquiere mediante el aprendizaje y puede concretarse en una acción relacionada a un area del conocimiento

  Ejemplos:

- Tocar el piano
- Excel
- Artes marciales mixtas
- javaScript
- Cocinar
  `,
});

const skillField = new TextFieldTemplate({
  templateId: "skillName",
  label: "Habilidad",
  placeholder: "Tocar el piano",
  tip: "Escribe una habilidad",
});

const iconField = new ImageFieldTemplate({
  templateId: "icon",
  primaryActionLabel: "Cargar icono",
  destructiveActionLabel: "Eliminar icono",
  alt: "Icono",
  label: "Icono",
});

const skillLevel = new LevelFieldTemplate({
  templateId: "level",
  label: "Nivel",
  minMark: "Básico",
  maxMark: "Avanzado",
});

const createSkillValue = ({ skill, icon, level } = {}) => {
  return [
    [skillField, skill],
    [iconField, icon],
    [skillLevel, level],
  ].map(([{ templateId }, value]) => ({ templateId, value }));
};

const removeSkillAction = new RemoveItemTemplate({
  templateId: "removeSkillAction",
  label: "Eliminar habilidad",
});

const skillSection = new SectionTemplate({
  templateId: "skill",
  name: "Habilidad",
  Icon: IntellectIcon,
  value: createSkillValue(),
  actions: [removeSkillAction].map(getTemplateIdObject),
});

const createHardSkillsFormValue = (skills = [{}]) => {
  const buildSection = (skill) => {
    return {
      templateId: skillSection.templateId,
      value: createSkillValue(skill),
    };
  };
  return [
    { templateId: hardSkillsTipCard.templateId },
    ...skills.map(buildSection),
  ];
};

const addSkillAction = new AddItemTemplate({
  templateId: "addSkillAction",
  targetId: skillSection.templateId,
  Icon: skillSection.Icon,
  label: "Agregar habilidad",
});

const hardSkillsForm = new FormTemplate({
  templateId: "hardSkillsForm",
  name: "Habilidades duras",
  Icon: LightBulbIcon,
  value: createHardSkillsFormValue(),
  actions: [addSkillAction].map(getTemplateIdObject),
  exampleValue: createHardSkillsFormValue(exampleUser.hardSkills),
});

/* 
softSkills
----------------------------------------------------------------------------
*/

const softSkillsTipCard = new TipCardTemplate({
  templateId: "softSkillsTipCard",
  tip: `Para este proyecto una habilidad blanda es una capacidad que describe como un
   individuo interactúa y se desarrolla socialmente en espacios interdisciplinarios. 
   Suelen manifestarse como rasgos de la personalidad innatos o que son difícilmente enseñables y medibles.
   
   Ejemplos:

- Adaptabilidad
- Trabajo en equipo
- Resolución de problemas
- Inteligencia emocional
- Resolución de conflicto
   `,
});

const skillListField = new ListFieldTemplate({
  templateId: "skillList",
  label: "Habilidades",
  placeholder: "Trabajo en equipo",
  primaryActionLabel: "Agregar habilidad",
  exampleValue: exampleUser.softSkills,
});

const softSkillsForm = new FormTemplate({
  templateId: "softSkillsForm",
  name: "Habilidades blandas",
  Icon: PlantIcon,
  value: [softSkillsTipCard, skillListField].map(getTemplateIdObject),
});

/* 
userScreenData
----------------------------------------------------------------------------
*/

const label = "Información";
const templates = [
  nameField,
  lastNameField,
  titleField,
  descriptionField,
  avatarField,
  personForm,
  mailField,
  phoneNumberField,
  addressField,
  userField,
  webSiteNameField,
  urlField,
  linkedInSection,
  githubSection,
  webSiteSection,
  contactForm,
  projectNameField,
  projectDescriptionField,
  roleField,
  dateRangeField,
  organizationField,
  tasksField,
  removeProjectAction,
  projectSection,
  removeJobAction,
  jobSection,
  addJobAction,
  addProjectAction,
  experienceForm,
  studyNameField,
  removeStudyAction,
  studySection,
  addStudyAction,
  educationForm,
  issuingOrganizationField,
  motiveField,
  issuingDateField,
  removeAwardAction,
  awardSection,
  addAwardAction,
  awardsForm,
  hardSkillsTipCard,
  skillField,
  iconField,
  skillLevel,
  removeSkillAction,
  skillSection,
  addSkillAction,
  hardSkillsForm,
  softSkillsTipCard,
  skillListField,
  softSkillsForm,
].reduce(
  (result, current) => ({ ...result, [current.templateId]: current }),
  {},
);

const content = [
  personForm,
  contactForm,
  experienceForm,
  educationForm,
  awardsForm,
  hardSkillsForm,
  softSkillsForm,
].map(getTemplateIdObject);

class UserScreenData extends Screen {
  constructor({ content = [], templates = {}, label }) {
    super({ label, id: "userForm" });
    Object.assign(this, { content: [...content], templates: { ...templates } });
  }
}

export default new UserScreenData({ label, templates, content });

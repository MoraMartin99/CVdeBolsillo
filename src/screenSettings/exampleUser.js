import avatar from "../assets/images/ommcavatar.jpg";
import HTML from "../assets/images/HTML.svg";
import CSS from "../assets/images/CSS.svg";
import js from "../assets/images/js.svg";
import git from "../assets/images/git.svg";
import bash from "../assets/images/bash.svg";
import linux from "../assets/images/linux.svg";
import penpot from "../assets/images/penpot.svg";
import github from "../assets/images/githubWhite.svg";
import vba from "../assets/images/vba.svg";
import react from "../assets/images/react.svg";
import vitest from "../assets/images/vitest.svg";
import jsdoc from "../assets/images/jsdoc.svg";
import office from "../assets/images/office.svg";

/**@module ExampleUser */

/**
 * The SocialProfile class defines the properties of a generic social network profile
 */
class SocialProfile {
  /**
   * Creates a generic social network profile
   * @param {object} settings
   * @param {string} settings.user The visible user/profile name
   * @param {string} settings.URL
   */
  constructor({ user, URL }) {
    Object.assign(this, { user, URL });
  }
}

/**
 * The Image class defines the properties of an image and its display properties
 */
class Image {
  /**
   * Creates an image and its display properties
   * @param {object} settings
   * @param {string} settings.source A path to an image
   * @param {number} settings.positionX The horizontal offset of the image relative to the left upper corner of the wrapper
   * @param {number} settings.positionY The vertical offset of the image relative to the left upper corner of the wrapper
   * @param {number} settings.scale The ratio of the computed size to the size defined in the styles
   */
  constructor({ source, positionX, positionY, scale }) {
    Object.assign(this, { source, positionX, positionY, scale });
  }
}

class ListItem {
  constructor(value) {
    Object.assign(this, { value, id: crypto.randomUUID() });
  }
}

/**
 * The BasicDate class defines the properties of a basic date
 */
class BasicDate {
  /**
   * Creates a basic date
   * @param {object} settings
   * @param {number} settings.month
   * @param {number} settings.year
   */
  constructor({ month, year }) {
    Object.assign(this, { month, year });
  }
}

/**
 * The CurrentlyDate class defines the properties a date that represents the present moment
 */
class CurrentlyDate {
  /**
   * Creates a date that represents the present moment
   */
  constructor() {
    Object.assign(this, { isCurrently: true });
  }
}

/**
 * The DateRange class defines a range of dates
 */
class DateRange {
  /**
   * Creates a range of dates
   * @param {object} settings
   * @param {BasicDate|CurrentlyDate} settings.start
   * @param {BasicDate|CurrentlyDate} settings.finish
   */
  constructor({ start, finish }) {
    Object.assign(this, { start, finish });
  }
}

/**
 * The Project class defines the properties of a project
 */
class Project {
  /**
   * Creates a project
   * @param {object} settings
   * @param {string} settings.name
   * @param {string} settings.description
   * @param {string} settings.role The role/s the user had in the project
   * @param {DateRange} settings.dateRange The dates the project took place
   */
  constructor({ name, description, role, dateRange }) {
    Object.assign(this, { name, description, role, dateRange });
  }
}

/**
 * The Job class defines the properties of a job
 */
class Job {
  /**
   * Creates a job
   * @param {object} settings
   * @param {string} settings.organization
   * @param {string} settings.role
   * @param {DateRange} settings.dateRange
   * @param {Array<ListItem>} settings.tasks
   */
  constructor({ organization, role, dateRange, tasks }) {
    Object.assign(this, { organization, role, dateRange, tasks });
  }
}

/**
 * The Study class defines the properties of a study
 */
class Study {
  /**
   * Creates a study
   * @param {object} settings
   * @param {string} settings.issuingOrganization
   * @param {string} settings.study
   * @param {DateRange} settings.dateRange
   */
  constructor({ issuingOrganization, study, dateRange }) {
    Object.assign(this, { issuingOrganization, study, dateRange });
  }
}

/**
 * The Award class defines the properties of an award
 */
class Award {
  /**
   * Creates an award
   * @param {object} settings
   * @param {string} settings.issuingOrganization
   * @param {string} settings.motive
   * @param {BasicDate} settings.date
   */
  constructor({ issuingOrganization, motive, date }) {
    Object.assign(this, { issuingOrganization, motive, date });
  }
}

/**
 * The HardSkill class defines the properties of a hardSkill
 */
class HardSkill {
  /**
   * Creates a hardSkill
   * @param {object} settings
   * @param {string} settings.skill
   * @param {Image} settings.icon
   * @param {number} settings.level A number between 1 and 10 that represents the expertise in some skill
   */
  constructor({ skill, icon, level }) {
    Object.assign(this, { skill, icon, level });
  }
}

/**
 * The ExampleUser class defines the properties of an example user for the user form
 */
class ExampleUser {
  /**
   * Creates an example user
   * @param {object} settings
   * @param {string} settings.name
   * @param {string} settings.lastName
   * @param {string} settings.title A short sentence defining your profession
   * @param {string} settings.description
   * @param {Image} settings.avatar
   * @param {string} settings.mail
   * @param {string} settings.phoneNumber
   * @param {string} settings.address
   * @param {SocialProfile} settings.linkedIn
   * @param {SocialProfile} settings.github
   * @param {SocialProfile} settings.webSite
   * @param {Array<Project>} settings.projects
   * @param {Array<Job>} settings.jobs
   * @param {Array<Award>} settings.awards
   * @param {Array<HardSkill>} settings.hardSkills
   * @param {Array<ListItem>} settings.softSkills
   * @param {Array<Study>} settings.studies
   */
  constructor({
    name,
    lastName,
    title,
    description,
    avatar = {},
    mail,
    phoneNumber,
    address,
    linkedIn = {},
    github = {},
    webSite = {},
    projects = [],
    jobs = [],
    awards = [],
    hardSkills = [],
    softSkills = [],
    studies = [],
  }) {
    Object.assign(this, {
      name,
      lastName,
      title,
      description,
      avatar,
      mail,
      phoneNumber,
      address,
      linkedIn,
      github,
      webSite,
      projects,
      jobs,
      awards,
      hardSkills,
      softSkills,
      studies,
    });
  }
}

const projects = [
  new Project({
    name: "CVdeBolsillo",
    description: "descripción",
    role: "full developer",
    dateRange: new DateRange({
      finish: new CurrentlyDate(),
      start: new BasicDate({ month: 3, year: 2025 }),
    }),
  }),
  new Project({
    name: "equisCero",
    description: "Juego web del tic tac toe PVSP/PVSCPU.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 12, year: 2024 }),
      start: new BasicDate({ month: 10, year: 2023 }),
    }),
  }),
  new Project({
    name: "Alejandría",
    description: "Página web responsiva para llevar tu control de lectura.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 9, year: 2023 }),
      start: new BasicDate({ month: 6, year: 2023 }),
    }),
  }),
  new Project({
    name: "pokeBoard",
    description:
      "Página web responsiva que despliega un dashboard para un entrenador Pokémon, mostrando de forma dinámica Pokémons, items y Pokémons cercanos.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 6, year: 2023 }),
      start: new BasicDate({ month: 3, year: 2023 }),
    }),
  }),
  new Project({
    name: "Sign Up form Papaya Mix",
    description:
      "Pagina web responsiva para el registro de clientes del restaurante de malteadas ficticio Papaya Mix.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 3, year: 2023 }),
      start: new BasicDate({ month: 2, year: 2023 }),
    }),
  }),
  new Project({
    name: "Calculator",
    description:
      "Pagina web que recrea las operaciones de una calculadora básica.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 1, year: 2023 }),
      start: new BasicDate({ month: 10, year: 2022 }),
    }),
  }),
  new Project({
    name: "Sketch pad",
    description:
      "Pagina web para dibujar pixelart, en ella se puede utilizar lápiz y borrador, utilizar colores aleatorios o personalizados, ajustar la cuadricula e imprimir en tamaño A4.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 10, year: 2022 }),
      start: new BasicDate({ month: 8, year: 2022 }),
    }),
  }),
  new Project({
    name: "Rock Paper Scissors",
    description:
      "Pagina web para jugar 5 rounds de Piedra, Papel o Tijera en contra de la computadora.",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 8, year: 2022 }),
      start: new BasicDate({ month: 5, year: 2022 }),
    }),
  }),
  new Project({
    name: "Yokohama trip",
    description: "Pagina web sencilla (Landing page).",
    role: "full developer",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 4, year: 2022 }),
      start: new BasicDate({ month: 4, year: 2022 }),
    }),
  }),
];

const jobs = [
  new Job({
    organization: "Punto Ideal S.A",
    role: "Técnico RH",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 7, year: 2021 }),
      start: new BasicDate({ month: 12, year: 2020 }),
    }),
    tasks: [
      "Diseño, formulación, desarrollo e implementación de automatización de cobro de las deducciones (reducción de 40h de trabajo a 10 min).",
      "Diseño, formulación, desarrollo e implementación de automatización de pago de viáticos (reducción de 40h de trabajo a 10 min).",
      "Diseño, formulación, desarrollo e implementación de automatización de alta de correos electrónicos (reducción de 24h de trabajo a 5 min).",
      "Diseño, formulación, desarrollo e implementación de aplicativo para creación masiva de memorandum de entrega de uniformes (reducción de 5h de trabajo a 1 min).",
      "Actividades del puesto Auxiliar RH.",
    ].map((value) => new ListItem(value)),
  }),
  new Job({
    organization: "Punto Ideal S.A",
    role: "Auxiliar RH",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 12, year: 2020 }),
      start: new BasicDate({ month: 7, year: 2019 }),
    }),
    tasks: [
      "Administración y formulación de cobro de las deducciones.",
      "Administración y formulación de pago de viáticos.",
      "Diseño, Formulación, estandarización e implementación de formatos y procedimientos.",
      "Remisión de subsidios al INSS",
      "Atención de inspecciones del MITRAB",
      "Automatización de la creación masiva y llenado de formatos de solicitud al area de TI",
      "Administración y remisión de soporte de cheques.",
      "Actividades del puesto Practicante RH.",
    ].map((value) => new ListItem(value)),
  }),
  new Job({
    organization: "Punto Ideal S.A",
    role: "Practicante RH",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 7, year: 2019 }),
      start: new BasicDate({ month: 11, year: 2018 }),
    }),
    tasks: [
      "Administración y compra de inventario de uniforme.",
      "Administración y compra de papelería.",
      "Altas de usuarios.",
      "Administración y asesoría en afiliaciones, llamados de atención, solicitud de vacaciones, solicitud de carnet.",
      "Seguimiento de requerimientos de nuevos ingresos.",
      "Entrega de liquidaciones.",
      "Administración de inventario de cheques.",
      "Altas, bajas y reposiciones de tarjetas Monibyte.",
    ].map((value) => new ListItem(value)),
  }),
  new Job({
    organization: "KAISEN S.A",
    role: "Practicante del area de Desarrollo del talento humano",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 2, year: 2018 }),
      start: new BasicDate({ month: 8, year: 2017 }),
    }),
    tasks: [
      "Desarrollo de aplicativo de control de Ausentismo para 1500 empleados.",
      "Proyecto de mejoramiento de 5S de 15 Módulos de producción, de unos 13 trabajadores cada uno.",
      "Proyecto de teoría de colas en el puesto de atención al asociado.",
    ].map((value) => new ListItem(value)),
  }),
];

const studies = [
  new Study({
    issuingOrganization: "The Odin project",
    study: "Frontend Web Development",
    dateRange: new DateRange({
      start: new BasicDate({ month: 2, year: 2022 }),
      finish: new CurrentlyDate(),
    }),
  }),
  new Study({
    issuingOrganization: "freeCodeCamp",
    study: "JavaScript Algorithms and Data Structures",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 2, year: 2022 }),
      start: new BasicDate({ month: 12, year: 2021 }),
    }),
  }),
  new Study({
    issuingOrganization: "Codecademy",
    study: "Learn Intermediate CSS Course",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 12, year: 2021 }),
      start: new BasicDate({ month: 10, year: 2021 }),
    }),
  }),
  new Study({
    issuingOrganization: "EDteam",
    study: "CSS Flexbox y Grid",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 10, year: 2021 }),
      start: new BasicDate({ month: 9, year: 2021 }),
    }),
  }),
  new Study({
    issuingOrganization: "EDteam",
    study: "CSS desde cero",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 10, year: 2021 }),
      start: new BasicDate({ month: 9, year: 2021 }),
    }),
  }),
  new Study({
    issuingOrganization: "EDteam",
    study: "HTML desde cero",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 9, year: 2021 }),
      start: new BasicDate({ month: 9, year: 2021 }),
    }),
  }),
  new Study({
    issuingOrganization: "Universidad Centroamericana",
    study: "Ingeniería Industrial + Mención en gestión de la calidad",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 9, year: 2020 }),
      start: new BasicDate({ month: 1, year: 2015 }),
    }),
  }),
  new Study({
    issuingOrganization: "LinkedIn Learning",
    study: "Visual basic for application Intermedio",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 2, year: 2017 }),
      start: new BasicDate({ month: 2, year: 2017 }),
    }),
  }),
  new Study({
    issuingOrganization: "LinkedIn Learning",
    study: "Excel avanzado",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 3, year: 2017 }),
      start: new BasicDate({ month: 3, year: 2017 }),
    }),
  }),
  new Study({
    issuingOrganization: "LinkedIn Learning",
    study: "MS Office intermedio",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 4, year: 2017 }),
      start: new BasicDate({ month: 4, year: 2017 }),
    }),
  }),
  new Study({
    issuingOrganization: "Universidad Centroamericana",
    study: "Curso de Excel para Ingeniería Industrial",
    dateRange: new DateRange({
      finish: new BasicDate({ month: 7, year: 2017 }),
      start: new BasicDate({ month: 4, year: 2017 }),
    }),
  }),
];

const exampleUser = new ExampleUser({
  name: "Oscar Martin",
  lastName: "Mora",
  title: "Ingeniero industrial y estudiante autodidacta de Desarrollo web",
  description: `Mi vocación de vida es ser un eterno aprendiz y un buen hijo/hermano/nieto.
   Me apasiona aprender de todo, incluso cosas que originalmente no me llamaban la atención. 
   Hace un par de años descubrí que me encantaba leer y desde entonces leo varias horas al dia.
   Desde que descubrí linux y el mundo FOSS no he extrañado ni un poquito las bigTech.
   Programar siempre ha estado conmigo desde la universidad y en mis primeros trabajos, donde desarrolle software (desde lo poco que sabia) que resolvía problemas reales.
   Programar era la mejor parte de esas experiencias para ser preciso, por eso decidí ser un programador profesional`,
  avatar: new Image({ source: avatar }),
  mail: "moramartin99@gmail.com",
  address: "Carazo",
  linkedIn: new SocialProfile({
    user: "Oscar Martin Mora",
    URL: "https://www.linkedin.com/in/oscar-martin-m-892299152/",
  }),
  github: new SocialProfile({
    user: "MoraMartin99",
    URL: "https://github.com/MoraMartin99",
  }),
  projects,
  jobs,
  awards: [
    new Award({
      issuingOrganization: "Universidad centroamericana",
      motive:
        "Reconocimiento a la excelencia por alcanzar 99 puntos en curso de Excel para Ingeniería Industrial",
      date: new BasicDate({ month: 7, year: 2017 }),
    }),
  ],
  hardSkills: [
    new HardSkill({
      skill: "HTML",
      icon: new Image({ source: HTML }),
      level: 5,
    }),
    new HardSkill({ skill: "CSS", icon: new Image({ source: CSS }), level: 5 }),
    new HardSkill({
      skill: "javaScript",
      icon: new Image({ source: js }),
      level: 5,
    }),
    new HardSkill({ skill: "git", icon: new Image({ source: git }), level: 5 }),
    new HardSkill({
      skill: "bash",
      icon: new Image({ source: bash }),
      level: 5,
    }),
    new HardSkill({
      skill: "linux",
      icon: new Image({ source: linux }),
      level: 5,
    }),
    new HardSkill({
      skill: "penpot",
      icon: new Image({ source: penpot }),
      level: 5,
    }),
    new HardSkill({
      skill: "github",
      icon: new Image({ source: github }),
      level: 5,
    }),
    new HardSkill({
      skill: "visual basic",
      icon: new Image({ source: vba }),
      level: 5,
    }),
    new HardSkill({
      skill: "react",
      icon: new Image({ source: react }),
      level: 5,
    }),
    new HardSkill({
      skill: "vitest",
      icon: new Image({ source: vitest }),
      level: 5,
    }),
    new HardSkill({
      skill: "jsdoc",
      icon: new Image({ source: jsdoc }),
      level: 2,
    }),
    new HardSkill({
      skill: "MS Office",
      icon: new Image({ source: office }),
      level: 5,
    }),
  ],
  studies,
  softSkills: [
    "Gusto por los desafíos",
    "Creatividad",
    "Empatía",
    "Iniciativa",
    "Resiliencia",
    "Disciplina",
    "Curiosidad",
    "Flexibilidad",
    "Pragmatismo",
  ].map((value) => new ListItem(value)),
});
export default exampleUser;

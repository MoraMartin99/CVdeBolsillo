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

class SocialProfile {
  constructor({ user, URL }) {
    Object.assign(this, { user, URL });
  }
}

class Image {
  constructor({ source, positionX, positionY, scale }) {
    Object.assign(this, { source, positionX, positionY, scale });
  }
}

class User {
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
  {
    name: "CVdeBolsillo",
    description: "descripción",
    role: "full developer",
    dateRange: {
      start: { month: 3, year: 2025 },
      finish: { isCurrently: true },
    },
  },
  {
    name: "equisCero",
    description: "Juego web del tic tac toe PVSP/PVSCPU.",
    role: "full developer",
    dateRange: {
      finish: { month: 12, year: 2024 },
      start: { month: 10, year: 2023 },
    },
  },
  {
    name: "Alejandría",
    description: "Página web responsiva para llevar tu control de lectura.",
    role: "full developer",
    dateRange: {
      finish: { month: 9, year: 2023 },
      start: { month: 6, year: 2023 },
    },
  },
  {
    name: "pokeBoard",
    description:
      "Página web responsiva que despliega un dashboard para un entrenador Pokémon, mostrando de forma dinámica Pokémons, items y Pokémons cercanos.",
    role: "full developer",
    dateRange: {
      finish: { month: 6, year: 2023 },
      start: { month: 3, year: 2023 },
    },
  },
  {
    name: "Sign Up form Papaya Mix",
    description:
      "Pagina web responsiva para el registro de clientes del restaurante de malteadas ficticio Papaya Mix.",
    role: "full developer",
    dateRange: {
      finish: { month: 3, year: 2023 },
      start: { month: 2, year: 2023 },
    },
  },
  {
    name: "Calculator",
    description:
      "Pagina web que recrea las operaciones de una calculadora básica.",
    role: "full developer",
    dateRange: {
      finish: { month: 1, year: 2023 },
      start: { month: 10, year: 2022 },
    },
  },
  {
    name: "Sketch pad",
    description:
      "Pagina web para dibujar pixelart, en ella se puede utilizar lápiz y borrador, utilizar colores aleatorios o personalizados, ajustar la cuadricula e imprimir en tamaño A4.",
    role: "full developer",
    dateRange: {
      finish: { month: 10, year: 2022 },
      start: { month: 8, year: 2022 },
    },
  },
  {
    name: "Rock Paper Scissors",
    description:
      "Pagina web para jugar 5 rounds de Piedra, Papel o Tijera en contra de la computadora.",
    role: "full developer",
    dateRange: {
      finish: { month: 8, year: 2022 },
      start: { month: 5, year: 2022 },
    },
  },
  {
    name: "Yokohama trip",
    description: "Pagina web sencilla (Landing page).",
    role: "full developer",
    dateRange: {
      finish: { month: 4, year: 2022 },
      start: { month: 4, year: 2022 },
    },
  },
];

const jobs = [
  {
    organization: "Punto Ideal S.A",
    role: "Técnico RH",
    dateRange: {
      finish: { month: 7, year: 2021 },
      start: { month: 12, year: 2020 },
    },
    tasks: [
      "Diseño, formulación, desarrollo e implementación de automatización de cobro de las deducciones (reducción de 40h de trabajo a 10 min).",
      "Diseño, formulación, desarrollo e implementación de automatización de pago de viáticos (reducción de 40h de trabajo a 10 min).",
      "Diseño, formulación, desarrollo e implementación de automatización de alta de correos electrónicos (reducción de 24h de trabajo a 5 min).",
      "Diseño, formulación, desarrollo e implementación de aplicativo para creación masiva de memorandum de entrega de uniformes (reducción de 5h de trabajo a 1 min).",
      "Actividades del puesto Auxiliar RH.",
    ],
  },
  {
    organization: "Punto Ideal S.A",
    role: "Auxiliar RH",
    dateRange: {
      finish: { month: 12, year: 2020 },
      start: { month: 7, year: 2019 },
    },
    tasks: [
      "Administración y formulación de cobro de las deducciones.",
      "Administración y formulación de pago de viáticos.",
      "Diseño, Formulación, estandarización e implementación de formatos y procedimientos.",
      "Remisión de subsidios al INSS",
      "Atención de inspecciones del MITRAB",
      "Automatización de la creación masiva y llenado de formatos de solicitud al area de TI",
      "Administración y remisión de soporte de cheques.",
      "Actividades del puesto Practicante RH.",
    ],
  },
  {
    organization: "Punto Ideal S.A",
    role: "Practicante RH",
    dateRange: {
      finish: { month: 7, year: 2019 },
      start: { month: 11, year: 2018 },
    },
    tasks: [
      "Administración y compra de inventario de uniforme.",
      "Administración y compra de papelería.",
      "Altas de usuarios.",
      "Administración y asesoría en afiliaciones, llamados de atención, solicitud de vacaciones, solicitud de carnet.",
      "Seguimiento de requerimientos de nuevos ingresos.",
      "Entrega de liquidaciones.",
      "Administración de inventario de cheques.",
      "Altas, bajas y reposiciones de tarjetas Monibyte.",
    ],
  },
  {
    organization: "KAISEN S.A",
    role: "Practicante del area de Desarrollo del talento humano",
    dateRange: {
      finish: { month: 2, year: 2018 },
      start: { month: 8, year: 2017 },
    },
    tasks: [
      "Desarrollo de aplicativo de control de Ausentismo para 1500 empleados.",
      "Proyecto de mejoramiento de 5S de 15 Módulos de producción, de unos 13 trabajadores cada uno.",
      "Proyecto de teoría de colas en el puesto de atención al asociado.",
    ],
  },
];

const studies = [
  {
    issuingOrganization: "The Odin project",
    study: "Frontend Web Development",
    dateRange: { start: { month: 2, year: 2022 }, isCurrently: true },
  },
  {
    issuingOrganization: "freeCodeCamp",
    study: "JavaScript Algorithms and Data Structures",
    dateRange: {
      finish: { month: 2, year: 2022 },
      start: { month: 12, year: 2021 },
    },
  },
  {
    issuingOrganization: "Codecademy",
    study: "Learn Intermediate CSS Course",
    dateRange: {
      finish: { month: 12, year: 2021 },
      start: { month: 10, year: 2021 },
    },
  },
  {
    issuingOrganization: "EDteam",
    study: "CSS Flexbox y Grid",
    dateRange: {
      finish: { month: 10, year: 2021 },
      start: { month: 9, year: 2021 },
    },
  },
  {
    issuingOrganization: "EDteam",
    study: "CSS desde cero",
    dateRange: {
      finish: { month: 10, year: 2021 },
      start: { month: 9, year: 2021 },
    },
  },
  {
    issuingOrganization: "EDteam",
    study: "HTML desde cero",
    dateRange: {
      finish: { month: 9, year: 2021 },
      start: { month: 9, year: 2021 },
    },
  },
  {
    issuingOrganization: "Universidad Centroamericana",
    study: "Ingeniería Industrial + Mención en gestión de la calidad",
    dateRange: {
      finish: { month: 9, year: 2020 },
      start: { month: 1, year: 2015 },
    },
  },
  {
    issuingOrganization: "LinkedIn Learning",
    study: "Visual basic for application Intermedio",
    dateRange: {
      finish: { month: 2, year: 2017 },
      start: { month: 2, year: 2017 },
    },
  },
  {
    issuingOrganization: "LinkedIn Learning",
    study: "Excel avanzado",
    dateRange: {
      finish: { month: 3, year: 2017 },
      start: { month: 3, year: 2017 },
    },
  },
  {
    issuingOrganization: "LinkedIn Learning",
    study: "MS Office intermedio",
    dateRange: {
      finish: { month: 4, year: 2017 },
      start: { month: 4, year: 2017 },
    },
  },
  {
    issuingOrganization: "Universidad Centroamericana",
    study: "Curso de Excel para Ingeniería Industrial",
    dateRange: {
      finish: { month: 7, year: 2017 },
      start: { month: 4, year: 2017 },
    },
  },
];

const exampleUser = new User({
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
    {
      issuingOrganization: "Universidad centroamericana",
      motive:
        "Reconocimiento a la excelencia por alcanzar 99 puntos en curso de Excel para Ingeniería Industrial",
      date: { month: 7, year: 2017 },
    },
  ],
  hardSkills: [
    { skill: "HTML", icon: new Image({ source: HTML }), level: 5 },
    { skill: "CSS", icon: new Image({ source: CSS }), level: 5 },
    { skill: "javaScript", icon: new Image({ source: js }), level: 5 },
    { skill: "git", icon: new Image({ source: git }), level: 5 },
    { skill: "bash", icon: new Image({ source: bash }), level: 5 },
    { skill: "linux", icon: new Image({ source: linux }), level: 5 },
    { skill: "penpot", icon: new Image({ source: penpot }), level: 5 },
    { skill: "github", icon: new Image({ source: github }), level: 5 },
    { skill: "visual basic", icon: new Image({ source: vba }), level: 5 },
    { skill: "react", icon: new Image({ source: react }), level: 5 },
    { skill: "vitest", icon: new Image({ source: vitest }), level: 5 },
    { skill: "jsdoc", icon: new Image({ source: jsdoc }), level: 2 },
    { skill: "MS Office", icon: new Image({ source: office }), level: 5 },
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
  ],
});
export default exampleUser;

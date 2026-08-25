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
import {
  UserData,
  HardSkill,
  Award,
  Study,
  Job,
  Project,
  DateRange,
  CurrentlyDate,
  BasicDate,
  ListItem,
  Image,
  SocialProfile,
} from "./UserData";

/**@module ExampleUser */

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

const exampleUser = new UserData({
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

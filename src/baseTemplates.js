import {
  isValidMail,
  isValidTelNumber,
  containsText,
  isValidURL,
  hasSource,
} from "./validators";

const baseForm = { component: "form" };
const baseField = {
  component: "field",
  label: "label",
  placeholder: "placeholder",
  tip: "tip",
  minMarkLabel: "min",
  maxMarkLabel: "max",
};
const baseTextField = {
  ...baseField,
  type: "text",
  validator: containsText,
  tip: "Este campo debe contener palabras",
};
const baseEmailField = {
  ...baseField,
  type: "email",
  placeholder: "floraflores@midominio.com",
  tip: "Escriba un mail valido. Por ejemplo: nombre@dominio.com",
  label: "Email",
  validator: isValidMail,
};
const baseImageField = {
  ...baseField,
  type: "image",
  primaryActionLabel: "Cargar icono",
  destructiveActionLabel: "Eliminar icono",
  validator: hasSource,
};
const baseTelField = {
  ...baseField,
  label: "Numero de teléfono",
  type: "tel",
  placeholder: "88888888",
  tip: "Escriba un numero telefónico de 8 dígitos",
  validator: isValidTelNumber,
};
const baseSection = { component: "section", name: "section" };
const baseURLField = {
  ...baseField,
  type: "url",
  label: "URL",
  placeholder: "https://www.google.com",
  validator: isValidURL,
  tip: "Escriba una dirección web válida: https://www.google.com",
};
const baseDateRangeField = {
  ...baseField,
  type: "dateRange",
  startLabel: "Desde",
  finishLabel: "Hasta",
};

export {
  baseForm,
  baseTextField,
  baseImageField,
  baseEmailField,
  baseTelField,
  baseSection,
  baseURLField,
  baseDateRangeField,
};

import template1 from "./cv1/main";
import template2 from "./cv2/main";

/**
 * A CV template
 * @typedef {object} template
 * @property {string} id
 * @property {string} thumbnail
 * @property {JSX.Element} Component
 * @property {string} label
 */

/**
 * The CV templates collection
 * @type {Array<template>}
 */
const templates = [template1, template2];

export default templates;

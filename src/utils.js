/**
 * @module utils
 */

/**
 * reduceToClassName function lets you reduce an array to a string format compatible with the react prop className
 * @param {Array<string>} arr An array of css clases
 * @returns {String} A string that represents the reduction of the array input
 */
const reduceToClassName = (arr) => arr.join(" ");

/**
 * toPascalCase return a texts formatted in [pascal case]{@link https://www.freecodecamp.org/news/snake-case-vs-camel-case-vs-pascal-case-vs-kebab-case-whats-the-difference/}
 * @param {string} text
 * @example <caption>works with single words:</caption>
 * toPascalCase("hola") // returns "Hola"
 * @example <caption>works with multiple words separated by multiple whitespaces, underscores(_), hyphens(-) or any combination of the previous separators:</caption>
 * toPascalCase("perro caliente") // returns "PerroCaliente"
 * toPascalCase("Hot-Dog") // returns "HotDog"
 * toPascalCase("camarón_que_Se_duerme_") // returns "CamarónQueSeDuerme"
 * toPascalCase("Tres tristes-tigres_Azules _-pardos") // returns "TresTristesTigresAzulesPardos"
 * toPascalCase("Tres -_ tristes--___  tigres   Azules _---___pardos") // returns "TresTristesTigresAzulesPardos"
 * @example <caption>works with start and/or end whitespaces, underscores(_), hyphens(-) or any combination of the previous separators</caption>
 * toPascalCase(" _- Rojo y azul _- _") // returns "RojoYAzul"
 * @example <caption>works with single letter words:</caption>
 * toPascalCase("a b c") // returns "ABC"
 * @example <caption>works with empty words:</caption>
 * toPascalCase("") // returns ""
 * @example <caption>returns an empty string if only separator are passed:</caption>
 * toPascalCase(" -_") // returns ""
 * @returns {string} The text formatted in pascal case
 */
const toPascalCase = (text) => {
  const words = text.toLowerCase().split(/[\s_-]+/g);
  const mapper = (word) => {
    return word ? `${word[0].toUpperCase()}${word.slice(1)}` : "";
  };
  return words.map(mapper).join("");
};

/**
 * A class that implements a debounce functionality
 */
class Debouncer {
  #delay;
  #timeOut;

  /**
   * Creates a debouncer
   * @param {number} delay The time in milliseconds needed to wait to run a callback
   */
  constructor(delay) {
    this.#delay = delay;
    this.#timeOut = null;
  }

  /**
   * Runs the callback after the time delay. It aborts previously scheduled callbacks that were pending
   * @param {function} callback
   */
  run(callback) {
    clearTimeout(this.#timeOut);
    this.#timeOut = setTimeout(callback, this.delay);
  }

  /**
   * The time in milliseconds needed to wait to run a callback
   * @returns {number} the delay
   */
  get delay() {
    return this.#delay;
  }
}

/**
 * The clamp function clamps a value within a range of values between a minimum and a maximum
 * @param {number} min
 * @param {number} preferred
 * @param {number} max
 * @returns {number}
 */
const clamp = (min, preferred, max) => {
  return Math.min(Math.max(preferred, min), max);
};

export { reduceToClassName, toPascalCase, Debouncer, clamp };
export default { reduceToClassName, toPascalCase, Debouncer, clamp };

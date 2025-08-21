import { isEqual } from "lodash";
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
 * Returns a list of ordered indexes required to access the first item that is equal to a target within a list. The search is recursive and uses [lodash isEqual function]{@link https://lodash.com/docs/4.17.15#isEqual}
 * to do a deep comparison
 * @param {*} target The value to find within the list
 * @param {Array} list A list to be searched on
 * @example <caption>Works with one-dimensional arrays:</caption>
 * findSteps("b", ["a", "b", "c"]) // returns [1]
 * findSteps({}, [0, {}, {}],) // returns [1]
 * @example <caption>Works with multi-dimensional arrays:</caption>
 * findSteps(1, [0, ["a", "b", 1], 2]) // returns [1, 2]
 * @example <caption>Returns an empty array if list = []:</caption>
 * findSteps(1, []) // returns []
 * @example <caption>returns an empty array if target is not found:</caption>
 * findSteps(1, [2, 3, 4, 5]) // returns []
 * @example <caption>Works with arrays as a target:</caption>
 * findSteps([3, 2], [3, 2, [1, 2], [{}, [3, 2]]]) // returns [3, 1]
 * @returns {Array<number>} An array of indexes if the target is found or an empty array if the list is empty or the target is not found
 */
const findSteps = (target, list) => {
  const finder = (target, list) => {
    let result = [];
    const itEndsWithTargetValue = () => {
      const { value: lastValue } = result[result.length - 1];
      return isEqual(lastValue, target);
    };
    for (const [index, value] of list.entries()) {
      result = [{ index, value }];
      if (itEndsWithTargetValue()) break;
      if (Array.isArray(value)) {
        result = [...result, ...finder(target, value)];
        if (itEndsWithTargetValue()) break;
      }
      result = [];
    }

    return result;
  };

  return finder(target, list).map(({ index }) => index);
};

export { reduceToClassName, toPascalCase, findSteps };
export default { reduceToClassName, toPascalCase, findSteps };

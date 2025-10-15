/**
 * The extractValuesFromModel maps the values properties of a model to an object
 * @param {Array<object>} model An ordered list containing the data required to build form elements. Its returned by [useFormModel]{@link module:useFormModel}
 * @example <caption>works with an empty model:</caption>
 * const model = []
 * extractValuesFromModel(model)
 * // returns {}
 * @example <caption>works with multi dimensional models:</caption>
 * const model = [
        { id: "a", value: [{ id: "a1", value: "soy un valor" }] },
        { id: "b", value: true },
      ];
    extractValuesFromModel(model)
    // returns { a: { a1: "soy un valor" }, b: true }
  @example <caption>returns non modelItems objects as they are:</caption>
  const model = [
        { id: "a", value: [{ id: "a1", value: [1, 2, 3] }] },
        { id: "b", value: [{}, { myKey: 100, isRed: false }, true, null] },
      ];
  extractValuesFromModel(model)
  //returns {
        a: { a1: [1, 2, 3] },
        b: [{}, { myKey: 100, isRed: false }, true, null],
      };
 * @returns {object}
 */
function extractValuesFromModel(model) {
  const isModel = (list) => {
    if (!Array.isArray(list)) return false;
    const isModelItem = (item) => {
      if (typeof item !== "object" || item === null) return false;
      if (!item.id) return false;
      return true;
    };
    return list.every(isModelItem);
  };

  const reducer = (result, { id, value: defaultValue }) => {
    if (id == null) return result;
    const value = isModel(defaultValue)
      ? extractValuesFromModel(defaultValue)
      : defaultValue;
    return { ...result, [id]: value };
  };

  return model.reduce(reducer, {});
}

export default extractValuesFromModel;

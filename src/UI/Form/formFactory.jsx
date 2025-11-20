import Form from "./userDataForm/Form";
import Field from "./userDataForm/Field";

function formFactory(model = []) {
  const buildComponent = (item) => {
    if (typeof item !== "object" || item === null) return item;
    const {
      component,
      id,
      value: defaultValue,
      actions: defaultActions = [],
    } = item;
    const value = Array.isArray(defaultValue)
      ? formFactory(defaultValue)
      : defaultValue;
    const actions = formFactory(defaultActions);
    const key = id;
    if (component === "form") {
      return (
        <Form key={key} {...{ ...item, actions }}>
          {value}
        </Form>
      );
    } else if (component === "field") {
      return <Field key={key} {...{ ...item }}></Field>;
    }
    return item;
  };
  return model.map(buildComponent);
}

export default formFactory;

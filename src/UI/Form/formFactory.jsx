import Form from "./userDataForm/Form";
import Section from "./userDataForm/Section";
import ClassicField from "./userDataForm/ClassicField";
import ImageField from "./userDataForm/ImageField";
import DateRangeField from "./userDataForm/DateRangeField";
import ListField from "./userDataForm/ListField/ListField";
import FormButton from "./userDataForm/FormButton";
import DateField from "./userDataForm/DateField/DateField";
import TipCard from "./userDataForm/TipCard/TipCard";

/**
 * The formFactory builds all form elements based on a model
 * @param {Array<Object>} model
 * @returns {Array<JSX.Element>}
 */
const formFactory = (model = []) => {
  const buildComponent = (item) => {
    const enrichChildren = (children) => {
      return Array.isArray(children) ? formFactory(children) : children;
    };

    const isObject = (value) => typeof value === "object" && value !== null;

    const isForm = ({ component }) => component === "form";

    const buildForm = (item) => {
      return (
        <Form
          key={item.id}
          {...{ ...item, actions: enrichChildren(item.actions) }}
        >
          {enrichChildren(item.value)}
        </Form>
      );
    };

    const isClassicField = ({ component, type }) => {
      const classicFieldTypes = ["email", "number", "tel", "text", "url"];
      return component === "field" && classicFieldTypes.includes(type);
    };

    const buildClassicField = (item) => {
      return <ClassicField key={item.id} {...item}></ClassicField>;
    };

    const isImageField = ({ component, type }) => {
      return component === "field" && type === "image";
    };

    const buildImageField = (item) => {
      return <ImageField key={item.id} {...item}></ImageField>;
    };

    const isSection = ({ component }) => component === "section";

    const buildSection = (item) => {
      return (
        <Section
          key={item.id}
          {...{ ...item, actions: enrichChildren(item.actions) }}
        >
          {enrichChildren(item.value)}
        </Section>
      );
    };

    const isDateRangeField = ({ component, type }) => {
      return component === "field" && type === "dateRange";
    };

    const buildDateRangeField = (item) => {
      return <DateRangeField key={item.id} {...item}></DateRangeField>;
    };

    const isDateField = ({ component, type }) => {
      return component === "field" && type === "date";
    };

    const buildDateField = (item) => {
      return <DateField key={item.id} {...item}></DateField>;
    };

    const isListField = ({ component, type }) => {
      return component === "field" && type === "list";
    };

    const buildListField = (item) => {
      return <ListField key={item.id} {...item}></ListField>;
    };

    const isTipCard = ({ component }) => component === "tipCard";

    const buildTipCard = (item) => {
      return (
        <TipCard key={item.id} {...item}>
          {item.tip}
        </TipCard>
      );
    };

    const isAction = (item) => Boolean(item.action);

    const buildAction = (item) => {
      return (
        <FormButton
          key={item.id}
          {...item}
          variant={item.action === "removeItem" ? "destructive" : "primary"}
        >
          {item.label}
        </FormButton>
      );
    };

    if (!isObject(item)) return item;
    if (isForm(item)) return buildForm(item);
    if (isClassicField(item)) return buildClassicField(item);
    if (isImageField(item)) return buildImageField(item);
    if (isSection(item)) return buildSection(item);
    if (isDateRangeField(item)) return buildDateRangeField(item);
    if (isDateField(item)) return buildDateField(item);
    if (isListField(item)) return buildListField(item);
    if (isTipCard(item)) return buildTipCard(item);
    if (isAction(item)) return buildAction(item);
    return item;
  };

  return model.map(buildComponent);
};

export default formFactory;

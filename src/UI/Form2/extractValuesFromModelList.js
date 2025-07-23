function extractValuesFromModelList(modelList = []) {
  const reducer = (values, { id, value, contentDataList }) => {
    if (id == null) return values;
    if (value != null) return { ...values, [id]: value };
    if (contentDataList) {
      return { ...values, [id]: extractValuesFromModelList(contentDataList) };
    }
    return values;
  };
  return modelList.reduce(reducer, {});
}

export default extractValuesFromModelList;

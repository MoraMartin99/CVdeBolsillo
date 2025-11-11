const containsText = (value) => {
  if (typeof value !== "string") return false;
  const regex = /[a-z]/i;
  return regex.test(value);
};

export { containsText };

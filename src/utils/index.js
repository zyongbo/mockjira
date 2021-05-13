// !!value is to convert value to be boolean version
export const isValidValue = (value) => (value === 0 ? true : !!value);

// when you write a function, do not try to change the object itself
export const cleanObject = (object) => {
  // const result = Object.assign({}, object);
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // value might be 0, and 0 is a valid value, should not be false
    // if (!value) { // will be replaced by below
    if (!isValidValue(value)) {
      delete result[key];
    }
  });
  return result;
};

function filterFields({ reqBody, schema, skip = [], required = [] }) {
    const filteredFields = {};
    schema = schema.schema.obj;
  
    required.forEach((key) => {
      if (!reqBody.hasOwnProperty(key)) {
        throw new Error(`'${key}' is required`);
      }
    });
    Object.keys(reqBody).forEach((key) => {
      if (schema.hasOwnProperty(key) && !skip.includes(key)) {
        filteredFields[key] = reqBody[key];
      }
    });
  
    return filteredFields;
  }
  
  export { filterFields };
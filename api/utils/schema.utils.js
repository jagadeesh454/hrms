const _ = require('lodash')

const getSchemaFromModel = (model) => {
  const schema = { ...model.schema.obj };
  return _.mapValues(schema, (value) => {
    if (typeof _.get(value, 'type') === 'function') {
      value.type = value.type.schemaName;
    } else {
      value = getSchemaFromModel({ schema: { obj: value } })
    }
    return value;
  });
}

module.exports = {
  getSchemaFromModel
}


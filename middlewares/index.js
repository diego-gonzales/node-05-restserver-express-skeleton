const validateFieldsMiddleware = require('./validate-fields');
const validateJwtMiddleware = require('./validate-jwt');
const validateRolesMiddleware = require('./validate-roles');

module.exports = {
  ...validateFieldsMiddleware,
  ...validateJwtMiddleware,
  ...validateRolesMiddleware
}
const authController = require('../controllers/authentication.controller')

module.exports = (app) => {
  app.post('/api/v1/authentication/register', authController.register)
  app.post('/api/v1/authentication/login', authController.login)
}

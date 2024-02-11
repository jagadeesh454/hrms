const userController = require('../controllers/users.controller')

module.exports = (app) => {
  app.get('/api/v1/users/schema', userController.getSchema)
  app.post('/api/v1/users', userController.addUser)
  app.get('/api/v1/users', userController.getUserList)
  app.get('/api/v1/users/:userId', userController.getUser)
  app.put('/api/v1/users/:userId', userController.updateUser)
  app.delete('/api/v1/users/:userId', userController.removeUser)
}
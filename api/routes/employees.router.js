const employeesController = require('../controllers/employees.controller')

module.exports = (app) => {
  app.get('/api/v1/employees/schema', employeesController.getSchema)
  app.post('/api/v1/employees', employeesController.addEmployee)
  app.get('/api/v1/employees', employeesController.getEmployeeList)
  app.get('/api/v1/employees/:employeeId', employeesController.getEmployee)
  app.put('/api/v1/employees/:employeeId', employeesController.updateEmployee)
  app.delete('/api/v1/employees/:employeeId', employeesController.removeEmployee)
}

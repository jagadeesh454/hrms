const payrollController = require('../controllers/payroll.controller')

module.exports = (app) => {
  app.post('/api/v1/payroll', payrollController.createpayroll)
  app.get('/api/v1/payroll', payrollController.getpayroll)
  app.get('/api/v1/payroll/:payrollId', payrollController.getpayroll)
  app.put('/api/v1/payroll/:payrollId', payrollController.updatepayroll)
  app.delete('/api/v1/payroll/:payrollId', payrollController.deletepayroll)
}

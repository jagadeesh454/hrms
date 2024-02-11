const reportsController = require('../controllers/reports.controller')

module.exports = (app) => {
  app.post('/api/v1/reports', reportsController.createreport)
  app.get('/api/v1/reports', reportsController.getreports)
  app.get('/api/v1/reports/:reportId', reportsController.getreport)
  app.put('/api/v1/reports/:reportId', reportsController.updatereport)
  app.delete('/api/v1/reports/:reportId', reportsController.deletereport)
}

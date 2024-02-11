const dashboardController = require('../controllers/dashboard.controller')

module.exports = (app) => {
  app.get('/api/v1/dashboard/stats', dashboardController.totalStats)
  app.get('/api/v1/dashboard/leaves', dashboardController.latestLeaves)
  app.get('/api/v1/dashboard/birthdays', dashboardController.latestBirthdays)
  app.get('/api/v1/dashboard/notifications', dashboardController.notificationInfo)
  app.get('/api/v1/dashboard/employee-search', dashboardController.searchEmployee)
}

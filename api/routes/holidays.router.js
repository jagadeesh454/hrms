const holidaysController = require('../controllers/holidays.controller')

module.exports = (app) => {
  app.post('/api/v1/holidays', holidaysController.addHoliday)
  app.get('/api/v1/holidays', holidaysController.getHolidays)
  app.get('/api/v1/holidays/:holidayId', holidaysController.getHoliday)
  app.put('/api/v1/holidays/:holidayId', holidaysController.updateHoliday)
  app.delete('/api/v1/holidays/:holidayId', holidaysController.deleteHoliday)
}

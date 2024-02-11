const leavesController = require('../controllers/leaves.controller')

module.exports = (app) => {
  app.get('/api/v1/leaves/schema', leavesController.getSchema)
  app.post('/api/v1/leaves', leavesController.addLeave)
  app.get('/api/v1/leaves', leavesController.getLeaveList)
  app.get('/api/v1/leaves/:leaveId', leavesController.getLeave)
  app.put('/api/v1/leaves/:leaveId/status', leavesController.updateLeaveStatus)
}

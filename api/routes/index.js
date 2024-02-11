
module.exports = (app, express) => {
  require('./authentication.router')(app)
  require('./dashboard.router')(app)
  require('./leaves.router')(app)
  require('./employees.router')(app)
  require('./users.router')(app)
  // require('./holidays.router')(app)
  // require('./payroll.router')(app)
  // require('./reports.router')(app)
}

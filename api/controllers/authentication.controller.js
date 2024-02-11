const EmployeeModel = require('../models/employee.model');
const UserModel = require('../models/user.model');
const { wrapTryCatch } = require('../utils/common.utils');

async function register(req, res) {
  const { emailId } = req.body
  const employeeData = await EmployeeModel.findOne({emailId})
  const userData = await UserModel.findOne({emailId})
  if (!employeeData) return res.status(404).send({error: 'Employee not found'})
  else if (userData) return res.status(409).send({error: 'User already registered'})
  const user = new UserModel({
    ...req.body,
    emailId: employeeData.emailId, 
    name: employeeData.fullName, 
    role: employeeData.designation
  })
  await user.save()
  req.session.userId = user.userId;
  res.status(200).send(user.toJSON())
}

async function login(req, res) {
  const { emailId, password } = req.body
  const user = await UserModel.findOne({emailId: emailId});
  if (!user) return res.status(404).send({error: 'emailId is not registered'})
  else if (user.password != password) return res.status(401).send({error: 'incorrect password'})
  req.session.userId = user.userId
  res.status(200).send({
    success: true
  })
}

module.exports = {
  register: wrapTryCatch(register),
  login: wrapTryCatch(login)
}
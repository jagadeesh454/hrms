const EmployeeModel = require('../models/employee.model');
const UserModel = require('../models/user.model');
const { wrapTryCatch } = require('../utils/common.utils');
const { getSchemaFromModel } = require('../utils/schema.utils');

async function getSchema(req, res) {
  return res.status(200).send(getSchemaFromModel(UserModel));
}

async function addUser(req, res) {
  const { employeeId } = req.body
  const employeeData = await EmployeeModel.findOne({employeeId})
  if (!employeeData) return res.status(400).send({error: `No Employee found with Employee ID: ${employeeId}`})
  const userData = new UserModel({ ...req.body, emailId: employeeData.emailId, name: employeeData.fullName, role: employeeData.designation });
  const savedData = await userData.save();
  res.status(201).send(savedData);
}

async function getUserList(req, res) {
  const { offset = 0, limit = 10 } = req.query
  const users = await UserModel.find({}).skip(offset).limit(limit);
  res.status(200).send(users);
}

async function getUser(req, res) {
  const users = await UserModel.findOne({ userId: req.params.userId });
  res.status(200).send(users);
}

async function updateUser(req, res) {
  const { userId } = req.params;

  const updatedData = await UserModel.findOneAndUpdate({ userId: userId }, req.body, { new: true });

  if (!updatedData) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(202).send(updatedData);
}

async function removeUser(req, res) {
  const { userId } = req.params;

  const deletedUser = await UserModel.findOneAndDelete({ userId: userId });

  if (!deletedUser) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).send(deletedUser);
}

module.exports = {
  getSchema: wrapTryCatch(getSchema),
  addUser: wrapTryCatch(addUser),
  getUserList: wrapTryCatch(getUserList),
  getUser: wrapTryCatch(getUser),
  updateUser: wrapTryCatch(updateUser),
  removeUser: wrapTryCatch(removeUser)
};

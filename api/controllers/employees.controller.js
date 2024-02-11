const EmployeeModel = require('../models/employee.model');
const _ = require('lodash');
const { getSchemaFromModel } = require('../utils/schema.utils');
const { wrapTryCatch } = require('../utils/common.utils');

async function getSchema(req, res, next) {
  return res.status(200).send(getSchemaFromModel(EmployeeModel));
}

async function addEmployee(req, res, next) {
  const { employeeId } = req.body;
  const existingEmployee = await EmployeeModel.findOne({ employeeId });
  if (existingEmployee) {
    return res.status(409).json({ error: 'employee already exists' });
  }
  const employeeData = new EmployeeModel(req.body);
  await employeeData.save();
  res.status(201).send(employeeData.toJSON())
}

async function getEmployeeList(req, res, next) {
  const { offset = 0, limit = 10 } = req.query
  const data = await EmployeeModel.find({}, {}).skip(offset).limit(limit);
  res.status(200).send(data)
}

async function getEmployee(req, res, next) {
  const data = await EmployeeModel.findOne({ employeeId: req.params.employeeId });
  res.status(200).send(data);
}

async function updateEmployee(req, res, next) {
  const { employeeId } = req.params;

  const updatedData = await EmployeeModel.findOneAndUpdate({ employeeId: employeeId }, req.body, { new: true });

  if (!updatedData) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  res.status(202).send(updatedData);
}

async function removeEmployee(req, res, next) {
  const { employeeid } = req.params;

  const deletedData = await EmployeeModel.findOneAndDelete({ employeeid: employeeid });

  if (!deletedData) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  res.status(200).send({ employeeId: deletedData.employeeId });
}

module.exports = {
  getSchema: wrapTryCatch(getSchema),
  addEmployee: wrapTryCatch(addEmployee),
  getEmployeeList: wrapTryCatch(getEmployeeList),
  getEmployee: wrapTryCatch(getEmployee),
  updateEmployee: wrapTryCatch(updateEmployee),
  removeEmployee: wrapTryCatch(removeEmployee)
};

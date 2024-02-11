
const EmployeeModel = require('../models/employee.model');
const LeaveModel = require('../models/leave.model');
const NotificationModel = require('../models/notification.model');
const { wrapTryCatch } = require('../utils/common.utils');
const { getSchemaFromModel } = require('../utils/schema.utils');

async function getSchema(req, res) {
  return res.status(200).send(getSchemaFromModel(LeaveModel));
}

async function addLeave(req, res) {
  const { employeeId } = req.body
  const employeeData = await EmployeeModel.findOne({ employeeId })
  if (!employeeData) return res.status(404).send({error: `Employee not found with ID: ${employeeId}`})
  const leaveData = new LeaveModel(req.body);
  await leaveData.save();
  await NotificationModel.create({title: 'Leave request', content: `${employeeData.fullName} requested for leave of ${leaveData.daysCount} days` })
  res.status(201).send(leaveData);
}

async function getLeaveList(req, res) {
  const { offset = 0, limit = 10, employeeId } = req.query
  const leaves = await LeaveModel.find(employeeId ? {employeeId} : {}).skip(offset).limit(limit);
  res.status(200).send(leaves);
}

async function getLeave(req, res) {
  const leaves = await LeaveModel.findOne({ leaveId: req.params.leaveId });
  res.status(200).send(leaves);
}

async function updateLeaveStatus(req, res) {
  const { leaveId } = req.params
  const data = await LeaveModel.findOneAndUpdate({leaveId: leaveId}, {leaveStatus: req.body.leaveStatus}, {new: true})
  res.status(202).send(data);
}

module.exports = {
  getSchema: wrapTryCatch(getSchema),
  addLeave: wrapTryCatch(addLeave),
  updateLeaveStatus: wrapTryCatch(updateLeaveStatus),
  getLeaveList: wrapTryCatch(getLeaveList),
  getLeave: wrapTryCatch(getLeave)
}
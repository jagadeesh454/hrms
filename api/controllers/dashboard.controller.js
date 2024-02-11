const EmployeeModel = require("../models/employee.model");
const LeaveModel = require("../models/leave.model");
const NotificationModel = require("../models/notification.model");
const { wrapTryCatch } = require("../utils/common.utils")
const _ = require('lodash')

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
async function totalStats(req, res) {
  const employeesCount = await EmployeeModel.countDocuments({});
  const employeesCountByGender = await EmployeeModel.aggregate([{
    $group: {
        _id: '$gender', // Group by the gender field
        count: { $sum: 1 } // Count documents for each role
    }
  }])
  const leaveRequestCount = await LeaveModel.countDocuments({ leaveStatus: 'DRAFT' })
  const currentTime = new Date()
  const employeesOnLeave = await LeaveModel.countDocuments({fromDate: { $lte: currentTime }, toDate: { $gte: currentTime }})
  const response = {
    employeesCount: employeesCount,
    employeesCountByGender: _.reduce(employeesCountByGender, (acc, item) => {
      acc[item._id || 'other'] = item.count;
      return acc;
    }, {}),
    attendanceCount: {
      present: employeesCount - employeesOnLeave,
      absent: employeesOnLeave
    },
    leaveRequestCount: leaveRequestCount
  }
  res.status(200).send(response)
}

async function latestLeaves(req, res) {
  const leaveRequestList = await LeaveModel.find({ leaveStatus: 'DRAFT' })
  const employeesList = await EmployeeModel.find({employeeId: {$in: leaveRequestList.map(e => e.employeeId)}}).select('fullName employeeId')
  console.log(employeesList)
  leaveRequestList.forEach(leave => {
    const employee = employeesList.find(e => e.employeeId === leave.employeeId).toJSON()
    leave.employeeName = employee.fullName
  })
  
  res.status(200).send({
    count: leaveRequestList.length,
    data: leaveRequestList
  })
}

async function latestBirthdays(req, res) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log(today)
  const employees = await EmployeeModel.find({ dateOfBirth: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) } })
  res.status(200).send({
    count: employees.length,
    data: employees
  })
}

async function notificationInfo(req, res) {
  const notifications = await NotificationModel.find({userId: { $in: [req.session.userId, null] }})

  res.status(200).send({
    count: notifications.length,
    data: notifications
  })
}

async function searchEmployee(req, res) {

  res.status(200).send({})
}

module.exports = {
  totalStats: wrapTryCatch(totalStats),
  latestLeaves: wrapTryCatch(latestLeaves),
  latestBirthdays: wrapTryCatch(latestBirthdays),
  notificationInfo: wrapTryCatch(notificationInfo),
  searchEmployee: wrapTryCatch(searchEmployee)
}

function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesArray) {
    const employeeRecords = [];
    employeesArray.forEach(employee => {
        employeeRecords.push(createEmployeeRecord(employee));
    });
    return employeeRecords;
}

function createTimeInEvent(datestamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(datestamp.slice(-4)),
        date: datestamp.slice(0, 10)
    });
    return this;
}

function createTimeOutEvent(datestamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datestamp.slice(-4)),
        date: datestamp.slice(0, 10)
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeInHours = this.timeInEvents.find(event => event.date === date).hour;
    const timeOutHours = this.timeOutEvents.find(event => event.date === date).hour;

    return (timeOutHours - timeInHours) / 100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach(employee => { 
        payroll += allWagesFor.call(employee);
    });

    return payroll;
}

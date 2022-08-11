// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
};

function createTimeInEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeIn";
    obj.timeInEvents.push({ type, hour, date });
    return obj;
};

function createTimeOutEvent(obj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    let type = "TimeOut";
    obj.timeOutEvents.push({ type, hour, date });
    return obj;
};

function hoursWorkedOnDate(obj, workDate) {
    let inTime = obj.timeInEvents
        .filter((element) => element.date === workDate)
        .map((element) => element.hour)

    let outTime = obj.timeOutEvents
        .filter((element) => element.date === workDate)
        .map((element) => element.hour)
    
    return (outTime - inTime) / 100;
};

function wagesEarnedOnDate(obj, date) {
    return obj.payPerHour * hoursWorkedOnDate(obj, date)
};

function allWagesFor(obj) {
    let result = []
    const allDates = obj.timeInEvents.map((element) => (element = element.date))
    for (let element of allDates) {
        result.push(wagesEarnedOnDate(obj, element))
    }
    return result.reduce((a, b) => a + b, 0)
};

function findEmployeeByFirstName(srcArray, fName) {
    return srcArray.find((obj) => obj.firstName === fName)
};

function calculatePayroll(array) {
    return array.map(obj => allWagesFor(obj))
    .reduce ((a, b) => (a = a +b), 0)
};
const beejadb = require("../db/beejadb.js");
const moment = require('moment');

const managerModel = function (mgrmodel) {
    this.empcode = mgrmodel.empcode;
    this.empId = mgrmodel.empId;
    this.mgrname = mgrmodel.mgrname;
    // this.Event_Time = mgrmodel.Event_Time;
    this.mgrdepart = mgrmodel.mgrdepart;
    this.mgrdate = mgrmodel.mgrdate;
    this.mgrday = mgrmodel.mgrday;
    this.mgrmodework = mgrmodel.mgrmodework;
    this.mgrtask = mgrmodel.mgrtask;
    this.mgrtaskexcecute = mgrmodel.mgrtaskexcecute;
    this.mgrTaskstatus = mgrmodel.mgrTaskstatus;
    this.mgrresult = mgrmodel.mgrresult;
    this.mgrachievement = mgrmodel.mgrachievement;
    this.mgrfollowup = mgrmodel.mgrfollowup;
    this.mgmtsupport = mgrmodel.mgmtsupport;
    this.mgrworkstatus = mgrmodel.mgrworkstatus;
    this.report_date = mgrmodel.report_date;
    this.mid = mgrmodel.mid;
};

managerModel.addMgrModel = (managrModel, result) => {
    let now = moment();
    var dateNow = now.format("DD-MM-YYYY HH:mm:ss");
    var newQuery = `INSERT INTO hrm_manager_report(mgrname, mgrdepart, mgrdate, mgrday, mgrmodework, mgrtask, mgrtaskexcecute, mgrTaskstatus, mgrresult, mgrachievement, mgrfollowup, mgmtsupport, mgrworkstatus, empcode, empId, report_date) VALUES ('${managrModel.mgrname}','${managrModel.mgrdepart}','${managrModel.mgrdate}','${managrModel.mgrday}','${managrModel.mgrmodework}','${managrModel.mgrtask}','${managrModel.mgrtaskexcecute}','${managrModel.mgrTaskstatus}','${managrModel.mgrresult}','${managrModel.mgrachievement}','${managrModel.mgrfollowup}','${managrModel.mgmtsupport}','${managrModel.mgrworkstatus}','${managrModel.empcode}','${managrModel.empId}','${dateNow}')`;
    console.log(newQuery);
    beejadb.query(newQuery, (error, response) => {
        if (error) {
            var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response.affectedRows > 0) {
            var userres = {
                sts: "1",
                message: "Details Stored Successfully..!",
            }
            result(userres, null);
        } else {
            var userres = {
                sts: "1",
                message: "no data found",

            }
        }
    });
}

managerModel.listMgrModel = (managrModel, result) => {
    var sqlQuery = `SELECT * FROM hrm_manager_report where empcode = '${managrModel.empcode}'`
    console.log(sqlQuery);
    beejadb.query(sqlQuery, (error, response) => {
        console.log(response);
        if (error) {
            var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response.length > 0) {
            var userres = {
                sts: "1",
                message: "list view",
                result: response
            }
            result(null, userres);
        } else {
            var userres = {
                sts: "0",
                message: "No data Found",
            }
            result(null, userres);
        }
    });
};

managerModel.listMgrreportid = (managrModel, result) => {
    var sqlQuery = `SELECT * FROM hrm_manager_report where mid = '${managrModel.mid}'`
    // console.log(sqlQuery);
    beejadb.query(sqlQuery, (error, response) => {
        if (error) {
            var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response != null) {
            var userres = {
                sts: "1",
                message: "list view",
                result: response
            }
            result(null, userres);
        } else {
            var userres = {
                sts: "0",
                message: "No data Found",
            }
            result(null, userres);
        }
    });
};

managerModel.ceoReportList = (managrModel, result) => {
    var sqlQuery = `SELECT empId,empcode,mgrname FROM hrm_manager_report GROUP BY empcode`
    // console.log(sqlQuery);
    beejadb.query(sqlQuery, (error, response) => {
        if (error) {
            var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response != null) {
            var userres = {
                sts: "1",
                message: "list view",
                result: response
            }
            result(null, userres);
        } else {
            var userres = {
                sts: "0",
                message: "No data Found",
            }
            result(null, userres);
        }
    });
};

module.exports = managerModel;




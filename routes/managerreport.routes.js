module.exports = app => {
    const managercontroller = require("../controller/managerreport.controller.js");
     
    var router = require("express").Router();
    
       router.post("/add_report", managercontroller.add_report);
       router.post("/list_report", managercontroller.list_report);
       router.post("/report_id", managercontroller.reportId);
       router.post("/CEO_Reportlist", managercontroller.ceoReportList);
       
       app.use('/api/managers', router);
   };
   
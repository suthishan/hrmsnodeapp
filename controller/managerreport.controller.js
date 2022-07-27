const managerModel = require("../models/managerreport.model.js");

exports.add_report = (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.json({
        status: 0,
        message: "Content can not be empty!",
      });
    } else {
      const insertemp = new managerModel({
        empcode: req.body.empcode,
        empId: req.body.empId,
        mgrname: req.body.mgrname,
        mgrdepart: req.body.mgrdepart,
        mgrdate: req.body.mgrdate,
        emp_name: req.body.empname,
        mgrday:req.body.mgrday,
        mgrmodework:req.body.mgrmodework,
        mgrtask:req.body.mgrtask,
        mgrtaskexcecute:req.body.mgrtaskexcecute,
        mgrTaskstatus:req.body.mgrTaskstatus,
        mgrresult:req.body.mgrresult,
        mgrachievement: req.body.mgrachievement,
        mgrfollowup:req.body.mgrfollowup,
        mgmtsupport:req.body.mgmtsupport,
        mgrworkstatus:req.body.mgrworkstatus,
      });
  
      console.log(insertemp);
      managerModel.addMgrModel(insertemp, (err, data) => {
        if (err) {
          res.json(err);
        } else
          if (data['sts'] === "1") {
            // var data['data']
  
            res.json({
              status: "1",
              message: "data inserted"
            });
          } else {
            res.json({
              status: "0",
              message: "not inserted"
            });
          }
      });
    }
  }

  exports.list_report = (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.json({
        status: 0,
        message: "Content can not be empty!",
      });
    } else {
      const listemp = new managerModel({
        empcode: req.body.empcode,
      });
      managerModel.listMgrModel(listemp, (err, data) => {
        console.log(data);
        if (err) {
            res.json({
                status: "0",
                message: err
              });
        } else
          if (data['sts'] === "1") {
            // var data['data']
  
            res.json({
              status: "1",
              message: "Data Retrieved Successfully..!",
              result: data['result'],
            });
          } else {
            res.json({
              status: "0",
              message: data['message']
            });
          }
      });
    }
  }

  exports.reportId = (req, res) => {
    if (Object.keys(req.body).length === 0) {
      res.json({
        status: 0,
        message: "Content can not be empty!",
      });
    } else {
      const listemp = new managerModel({
        mid: req.body.mid,
      });
      managerModel.listMgrreportid(listemp, (err, data) => {
        if (err) {
            res.json({
                status: "0",
                message: err
              });
        } else
          if (data['sts'] === "1") {
            // var data['data']
  
            res.json({
              status: "1",
              message: "Data Retrieved Successfully..!",
              result: data['result'],
            });
          } else {
            res.json({
              status: "0",
              message: data['message']
            });
          }
      });
    }
  }


  exports.ceoReportList = (req, res) => {
         managerModel.ceoReportList(null, (err, data) => {
            console.log(data);
        if (err) {
            res.json({
                status: "0",
                message: err
              });
        } else
          if (data['sts'] === "1") {
            // var data['data']
  
            res.json({
              status: "1",
              message: "Data Retrieved Successfully..!",
              result: data['result'],
            });
          } else {
            res.json({
              status: "0",
              message: data['message']
            });
          }
      });
    
  }
  
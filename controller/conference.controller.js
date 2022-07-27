// const db = require("../db.js");
// const express = require ('express');


const conferenceModel = require("../models/conference.model.js");


exports.conferencebooking = (req, res) => {
    console.log(req.body);
 
    if (Object.keys(req.body).length === 0) {
      res.json({
        status: 0,
        message: "Content can not be empty!",
      });
    } else {
      const loginemp = new conferenceModel({
        emp_code: req.body.emp_code,
        emp_password: req.body.emp_code,
      });
  
conferenceModel.bookpage(loginemp, (err, data) => {
  // console.log(loginemp);
        if (err) {
          res.json(err);
        } else if (data["sts"] === "1") {
          res.json({
            status: "1",
            message: "Login Success",
            result: data["data"],
          });
        } else {
          res.json({
            status: "0",
            message: "No User Found",
          });
        }
      });
    }
}
    
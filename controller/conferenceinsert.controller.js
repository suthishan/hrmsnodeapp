const insertModel = require("../models/conferenceinsert.model.js");
const moment = require('moment');


exports.conferenceadd = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.json({
      status: 0,
      message: "Content can not be empty!",
    });
  } else {
    let now = moment();
    var dateNow = now.format("DD-MM-YYYY HH:mm:ss")
    var dateval = req.body.Event_date;
    var timeval = req.body.Select_Time;
var confe = req.body.Conference_Hall;
    // const format1 = "YYYY-MM-DD HH:mm:ss";
    // var dateTime1 = moment(new Date(dateval+' '+timeval+':00'));
    // var unix = moment(new Date(dateval+''+timeval )).format('x');
    // var unix = moment.unix(dateval+''+timeval);
    // const m = moment();
    const myMomentObject = moment(dateval+' '+timeval+':00', 'DD-MM-YYYY HH:mm:ss');
    console.log(myMomentObject.unix());
    // var formatted = moment(timeval, "HH:mm:ss").format("LT");
    var unix = myMomentObject.unix();
    // var timestamp = moment(dateval+''+ timeval).unix();
    // console.log(dateval+' '+timeval+':00');
    // console.log(unix);
    // console.log(formatted);
    // console.log(dateTime1);
    const insertemp = new insertModel({
      purpose_of_meeting: req.body.purpose_of_meeting,
      Conference_Hall: req.body.Conference_Hall,
      Event_date: req.body.Event_date,
      // Event_Time: req.body.Event_Time,
      emp_id: req.body.empcode,
      emp_name: req.body.empname,
      meeting_type:req.body.meeting_type,
      meeting_name:req.body.meeting_name,
      Select_Time:req.body.Select_Time,
      Select_session:req.body.Select_session,
      Duration_hours:req.body.Duration_hours,
      Duration_Minutes:req.body.Duration_Minutes,
      Date_of_booking: dateNow,
      timestamp:unix
    });

    // console.log(insertemp);
    insertModel.addpage(insertemp, (err, data) => {
      console.log(data);
      console.log(err);
      
      if (err) {
        res.json({
          status: "0",
          message: "Failed to Book Conference DB Error"
        });
      } else if (data['sts'] === "1") {
          // var data['data']

          res.json({
            status: "1",
            message: "Conference Room Booked inserted"
          });
        } else {
          res.json({
            status: "0",
            message: "Failed to Book Conference"
          });
        }
    });
  }
}
exports.conferenceview = (req, res) => {
  insertModel.Viewpage(null, (err, data) => {
    // console.log(data);

    if (err) {
      res.json(err);
    } else
      if (data['sts'] == "1") {
        var datavalue = data['result'];
        var arraydata = [];
        datavalue.forEach(element => {
                if(element.Conference_Hall === '1'){
                  element.Conference_Hall = "1st Floor";
                }else{
                  element.Conference_Hall = "3rd Floor"
                }
                if(element.Select_Time == '1'){
                  element.Select_Time = '09.00 AM ';
                }else if(element.Select_Time == '2'){
                  element.Select_Time = '09.30 AM ';
                }else if(element.Select_Time == '3'){
                  element.Select_Time = '10.00 AM';
                }else if(element.Select_Time == '4'){
                  element.Select_Time = '10.30 AM';
                }else if(element.Select_Time == '5'){
                  element.Select_Time = '11.00 AM';
                }else if(element.Select_Time == '6'){
                  element.Select_Time = '11.30 AM';
                }else if(element.Select_Time == '7'){
                  element.Select_Time = '12.00 PM ';
                }else if(element.Select_Time == '8'){
                  element.Select_Time = '12.30 PM ';
                }else if(element.Select_Time == '9'){
                  element.Select_Time = '01.00 PM';
                }else if(element.Select_Time == '10'){
                  element.Select_Time = '01.30 PM';
                }else if(element.Select_Time == '11'){
                  element.Select_Time = '02.00PM';
                }else if(element.Select_Time == '12'){
                  element.Select_Time = '02.30PM';
                }else if(element.Select_Time == '13'){
                  element.Select_Time = '03.00PM';
                }else if(element.Select_Time == '14'){
                  element.Select_Time = '03.30PM';
                }else if(element.Select_Time == '15'){
                  element.Select_Time = '04.00PM';
                }else if(element.Select_Time == '16'){
                  element.Select_Time = '04.30PM';
                }else if(element.Select_Time == '17'){
                  element.Select_Time = '05.00PM';
                }else if(element.Select_Time == '18'){
                  element.Select_Time = '05.30PM';
                }else if(element.Select_Time == '19'){
                  element.Select_Time = '06.00PM';
                }else if(element.Select_Time == '20'){
                  element.Select_Time = '06.30PM';
                }else if(element.Select_Time == '21'){
                  element.Select_Time = '07.00PM';
                }else if(element.Select_Time == '22'){
                  element.Select_Time = '07.30PM';
                }


              //  if(element.meeting_type == '1'){
              //     element.meeting_type = 'Internal'
              //   }else {
              //     element.meeting_type = 'External'
              //   }
                arraydata.push({
                  emp_id:element.emp_id,
                  emp_name:element.emp_name,
                  Date_of_booking:element.Date_of_booking,
                  Event_Date:element.Event_Date,
                  purpose_of_meeting:element.purpose_of_meeting,
                  Conference_Hall:element.Conference_Hall,
                  meeting_type:element.meeting_type,
                  meeting_name:element.meeting_name,
                  // Event_Time:element.Event_Time,
                  Select_Time:element.Select_Time,
                  Select_session:element.Select_session,
                  Duration_hours:element.Duration_hours,
                  Duration_Minutes:element.Duration_Minutes
                })
              
            });
            // console.log(arraydata);

        res.json({
          status: "1",
          message: "data listed",
          result: arraydata,
        });
      } else {
        res.json({
          status: "0",
          message: "no data found"
        });
      }
  });
}

exports.conferenceGetDate = (req, res) =>{
  if (Object.keys(req.body).length === 0) {
    res.json({
      status: 0,
      message: "Content can not be empty!",
    });
  } else {
    const checkDate = new insertModel({
      Event_date: req.body.Event_date,
      Select_Time:req.body.Select_Time,
      Conference_Hall:req.body.Conference_Hall,
    });

    insertModel.checkDate(checkDate, (err, data) => {
      if (err) {
        res.json(err);
      } else if (data['sts'] == "1") {
          res.json({
            status: "1",
            message: data['message']
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


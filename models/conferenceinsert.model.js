const db = require("../db/db.js");
const moment = require('moment');

const insertappModel = function (book) {
    this.emp_name = book.emp_name;
    this.Conference_Hall = book.Conference_Hall;
    this.Event_date = book.Event_date;
    // this.Event_Time = book.Event_Time;
    this.purpose_of_meeting = book.purpose_of_meeting;
    this.emp_id = book.emp_id;
    this.Date_of_booking = book.Date_of_booking;
    this.meeting_type = book.meeting_type;
    this.meeting_name = book.meeting_name;
    this.Select_Time = book.Select_Time;
    this.Select_session = book.Select_session;
    this.Duration_hours = book.Duration_hours;
    this.Duration_Minutes = book.Duration_Minutes;
    this.timestamp = book.timestamp;
};
insertappModel.addpage = (bookingdata, result) => {
    var sqlQuery = `INSERT INTO tbl_conference_booking(emp_id,emp_name,Date_of_booking,
    purpose_of_meeting,Conference_Hall,Event_Date,meeting_name,meeting_type,Select_Time,Select_session,Duration_hours,Duration_Minutes, timestamp)
    VALUES('${bookingdata.emp_id}','${bookingdata.emp_name}','${bookingdata.Date_of_booking}',
    '${bookingdata.purpose_of_meeting}','${bookingdata.Conference_Hall}','${bookingdata.Event_date}',
     '${bookingdata.meeting_name}', '${bookingdata.meeting_type}','${bookingdata.Select_Time}','${bookingdata.Select_session}',
     '${bookingdata.Duration_hours}','${bookingdata.Duration_Minutes}', '${bookingdata.timestamp}')`;
    console.log(sqlQuery);
    db.query(sqlQuery, (error, response) => {
        // console.log(error);
        if (error) {
          var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response.affectedRows > 0) {
            console.log(response);
            var userres = {
                sts: "1",
                message: "Success"
            }
            result(null, userres);
        }else{
            var userres = {
                sts: "0",
                message: "Failed to Book Conference",
                
            }
            result(null, userres);
        }

    });
}


insertappModel.Viewpage = (query, result) => {
    var sqlQuery = `SELECT * FROM tbl_conference_booking`
    // console.log(sqlQuery);
    db.query(sqlQuery, (error, response) => {
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
}

insertappModel.checkDate = (checkDate1, result)=>{
    if(checkDate1 !== null){
    var sqlQuery = `SELECT * FROM tbl_conference_booking where Event_Date = '${checkDate1.Event_date}' and Conference_Hall = '${checkDate1.Conference_Hall}'`
    console.log(sqlQuery);
    db.query(sqlQuery, (error, response) => {
        console.log(response);
        if (error) {
            var userres = {
                sts: "0",
                message: error
            }
            result(userres, null);
        } else if (response.length>0) {




            var dateval = checkDate1.Event_date;
            console.log("dateval");
            console.log(dateval);

            var timeval = checkDate1.Select_Time;
            console.log("timeval");
            console.log(timeval);
            const myMomentObject = moment(dateval+' '+timeval+':00', 'DD-MM-YYYY HH:mm:ss');
            // console.log(myMomentObject.unix());
            var unixgivenval = myMomentObject.unix();
            console.log("unixvalsdfsdfsdf");
            console.log(unixgivenval);
            var dataval = response;
            let arraytime = [];
            dataval.forEach(element => {
                var eletimestamp  = element.timestamp;
                var selecttime = element.Select_Time;
                var Event_Date = element.Event_Date;
     
                var durationhrs = element.Duration_hours;
                const durationmin = element.Duration_Minutes;
                const calminu = durationhrs * 60;
                // const addminu = _sum([calminu, durationmin]);
                const endTime = moment(Event_Date+' '+selecttime+':00', 'DD-MM-YYYY HH:mm').add(calminu, 'minutes').format('DD-MM-YYYY HH:mm');
                const timevaluefinal = moment(endTime, 'DD-MM-YYYY HH:mm').add(durationmin, 'minutes').format('DD-MM-YYYY HH:mm');
                console.log("endTime");
                console.log(timevaluefinal);
                // var durationhrs = element.Duration_hours;
                // var durationmin = element.Duration_Minutes;
                const myMomentObject1 = moment(timevaluefinal, 'DD-MM-YYYY HH:mm:ss');
                console.log("myMomentObject");
                console.log(myMomentObject1);
                var unixval = myMomentObject1.unix();
                console.log("unixval");
                console.log(unixval);
                arraytime.push(unixval);
            });
            console.log("arraytime");
            console.log(arraytime);

            
            let exist = '';
            arraytime.forEach(element => {
                console.log(element);
                // if(element)
                if(unixgivenval<=element){
                    exist = "exist";
                }
            });

            if(exist != ''){
                var userres = {
                    sts: "0",
                    message: "Already Conference is booked",
                }
                result(null, userres);
            }
            if(exist == ''){
                var userres = {
                    sts: "1",
                    message: "Conference can be Scheduled",
                }
                result(null, userres);
            }

            // var date1 = new Date(arraytime);
            // var date2 = new Date(unixval);
            
            // if(arraytime.includes(unixval)){
            //     console.log("true");
            //     var userres = {
            //         sts: "0",
            //         message: "Already Conference is booked",
            //     }
            //     result(null, userres);
            // }else{
            //     console.log("false");
            //     var userres = {
            //         sts: "1",
            //         message: "Conference can be Scheduled",
            //     }
            //     result(null, userres);
            // }
            
            
        } else {
            var userres = {
                sts: "1",
                message: "Conference can be Scheduled",
            }
            result(null, userres);
        }
    });
}
}

module.exports = insertappModel;
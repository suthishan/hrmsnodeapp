module.exports = app => {
 const conferencecontroller = require("../controller/conferenceinsert.controller.js");
  
 var router = require("express").Router();
 
    router.post("/listadd", conferencecontroller.conferenceadd);
    router.get("/listview", conferencecontroller.conferenceview);
    router.post("/checkDate", conferencecontroller.conferenceGetDate);
    
    app.use('/api/conference', router);
};


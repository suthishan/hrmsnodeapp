module.exports = app => {

    const conferencecontroller = require("../controller/login.controller.js");
    var router = require("express").Router();

    router.post("/login", conferencecontroller.conferencebooking);
    router.post("/beejaMgrLogin", conferencecontroller.beejaMgrLogin);
    
    app.use('/api/login', router);
};
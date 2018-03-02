const express = require('express');
const moment = require('moment');
const pdf = require('html-pdf');
const path = require('path');
var filePath = path.join(__dirname + '../../../../');
filePath = filePath.replace(new RegExp(/\\/g), '/')

const router = express.Router();
const event = require('../../models').event;

function isEventDateIsAlreadyBooked(events, start, end) {
    for (var i = 0; i < events.length; i++) {
        const newStartIsSameAsOldStart = moment(start).isSame(events[i].start);
        const newStartIsSameAsOldEnd = moment(start).isSame(events[i].end);
        const newStartIsBetweenOldEvent = moment(start).isBetween(events[i].start, events[i].end);
        const newEndIsBetweenOldEvent = moment(end).isBetween(events[i].start, events[i].end);
        const oldStartIsBetweenNewEvent = moment(events[i].start).isBetween(start, end);
        const oldEndIsBetweenNewEvent = moment(events[i].end).isBetween(start, end);
        if (newStartIsSameAsOldStart) {
            return true;
        } else if (newStartIsSameAsOldEnd) {
            return true;
        } else if (newStartIsBetweenOldEvent) {
            return true;
        } else if (newEndIsBetweenOldEvent) {
            return true;
        } else if (oldStartIsBetweenNewEvent) {
            return true;
        } else if (oldEndIsBetweenNewEvent) {
            return true;
        }
    }
    return false;
}
router.route('/newevent')
    .post((req, res, next) => {
        const dbFields = ['userId', 'department', 'title', 'hall', 'description', 'registerName', 'registerEmail', 'phone', 'start', 'end', 'allDay', 'ac'];
        const eventData = Object.assign({}, req.body);
        const isInputHasAllFields = Object.keys(eventData).every((v, i) => { return v === dbFields[i] });
        const isStartDateIsBeforeEndDate = moment(eventData.start).isBefore(eventData.end);
        const isStartDateIsSameAsEndDate = moment(eventData.start).isSame(eventData.end);
        if (isInputHasAllFields) {
            event.find({ hall: eventData.hall })
                .then(dbEvents => {
                    if (dbEvents.length > 0) {
                        const isHallIsBooked = isEventDateIsAlreadyBooked(dbEvents, eventData.start, eventData.end);

                        if (isHallIsBooked) {
                            res.send({
                                isSuccess: false,
                                message: 'someone has booked the hall on the same day'
                            })
                        } else {
                            event.createNewEvent(req.body)
                                .then(data => {
                                    res.send(data)
                                })
                                .catch(next);
                        }
                    } else if (dbEvents.length == 0) {
                        event.createNewEvent(req.body)
                            .then(data => {
                                res.send(data)
                            })
                            .catch(next);
                    }
                })
        } else {
            res.send({
                isSuccess: false,
                message: 'Please enter the valid details'
            })
        }
    })
router.route('/myevents/:userId')
    .get((req, res, next) => {
        const userId = req.params.userId;
        if (userId) {
            event.find({ userId }, { _id: false, __v: false })
                .then(resData => {
                    res.send(resData)
                })
        } else {
            res.json({
                isSuccess: false,
                message: 'userId is needed'
            })
        }
    })


  
router.use((err, req, res, next) => {
    console.log(err)
})


module.exports = router;
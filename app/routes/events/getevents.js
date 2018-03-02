const express = require('express');
const moment = require('moment');
const pdf = require('html-pdf');
const path = require('path');
var filePath = path.join(__dirname + '../../../../');
filePath = filePath.replace(new RegExp(/\\/g), '/')

const router = express.Router();
const event = require('../../models').event;
router.route('/getevents/:hall')
    .get((req, res, next) => {
        event.find({ hall: req.params.hall }, { _id: false, __v: false })
            .then(events => {
                res.json(events)
            })
    })

router.route('/getevents')
    .get((req, res, next) => {
        event.find({}, { _id: false, __v: false })
            .then(data => {
                // console.log(data)
                res.send(data)
            })
    })
    router.use((err, req, res, next) => {
    console.log(err)
})

router.route('/print/:eventId')
    .get((req, res, next) => {
        event.findOne({ eventId: req.params.eventId }, { _id: false, __v: false })
            .then(events => {
                if (events) {
                    var ac;
                    if (events.ac) {
                        ac = "Required"
                    } else {
                        ac = "Not required"
                    }
                    const options = {
                        format: 'letter',
                        header: {
                            contents: `<img src="file://${filePath}images/sns.png" style="width:100%;" alt="img">`
                        }
                    };
                    const html1 = `<br><br><div style="text-align:left; font-size:5px;">EventId: ${events.eventId}</div><img src="file://${filePath}images/sns.png" style="width:100%; display:none;" alt="img"><br>`
                    const html = `<div style="text-align:center; font-size:15px;"><b>Hall Registration bill</b></div><div style="text-align: right; font-size:10px; right:70px;">Date: ${moment().format('DD/MM/YYYY')}</div>`
                    // const html = `${events.title} <img src="/home/nagaraj/hallbooking/images/sns.png" style="width:100%;">`;
                    const html2 = `<div style="text-indent:50px;"><br><div style="font-size:10px;"><b>Hall:</b> ${events.hall}</div><br><div style="font-size:10px;"><b>Event Date:</b> ${moment(events.start).format('DD/MM/YYYY')} - ${moment(events.end).format('DD/MM/YYYY')}</div><br>
                   <div style="font-size:10px;"><b>Department:</b> ${events.department}</div>
                   <br><div style="font-size:10px;"><b>Event Name:</b> ${events.title}</div>
                   <br><div style="font-size:10px;"><b>Ac:</b> ${ac}</div>
                   <br><div style="font-size:10px;"><b>Description:</b> ${events.description}</div>
                   <br><div style="font-size:10px;"><b>RegisterName:</b> ${events.registerName}</div>
                   <br><div style="font-size:10px;"><b>RegisterEmail:</b> ${events.registerEmail}</div>
                   <br><div style="font-size:10px;"><b>Phone:</b> ${events.phone}</div>
                   <br><div style="font-size:10px; text-align:right;"><b>Sign   </b></div>
                   </div>
                   `;



                    pdf.create(html1 + html + html2, options).toStream(function(err, stream) {
                        res.setHeader('Content-Type', 'application/pdf');
                        stream.pipe(res)
                    });

                }

            })
            .catch(next)
    })
module.exports = router;
'use strict';
const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;
const EventSchema = new Schema({
    eventId: { type: String, default: uuid },
    userId: { type: String, required: true },
    title: { type: String, required: [true, 'Please give the title of the event'] },
    start: { type: Date, required: [true, 'please proveide the date and time the event when starts'] },
    end: { type: Date, required: [true, 'please proveide the date and time the event when ends'] },
    hall: { type: String, required: [true, 'please sselect the hall'] },
    department: { type: String},
    description: { type: String},
    allDay: { type: Boolean, required: true },
    ac: { type: Boolean, required: true },
    registerName: { type: String, required: [true, 'please provide the registerer name'] },
    registerEmail: { type: String, required: [true, 'please provide the registerer emailId'] },
    phone: { type: Number, required: [true, 'please provide the registerer Mobile Number'] }
})



function createNewEvent(newEventData) {
    const self = this;
    const newEvent = new Events(newEventData);
    return newEvent.save()
        .then(data => {

            return {
                isSuccess: true,
                userId: data.userId,
                eventId: data.eventId,
                title: data.title,
                start: data.start,
                end: data.end,
                hall: data.hall,
                allDay: data.allDay,
                registereName: data.registerName,
                registereEmail: data.registerEmail,
                phone: data.phone,
                ac: data.ac,
                department: data.department

            }
        })
        .catch(err => {
            console.log(err)
        })

}
EventSchema.statics.createNewEvent = createNewEvent;
const Events = mongoose.model('events', EventSchema)
module.exports = Events;
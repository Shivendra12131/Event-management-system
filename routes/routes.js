const express=require('express')

const router=express.Router();
const {createEvent,findevents}=require('../controllers/events')


router.post('/events',createEvent)
router.get('',findevents)

module.exports=router
const express=require('express')

const router=express.Router();
const {createEvent,findevents}=require('../controllers/events')


router.post('/create',createEvent)
router.get('/find',findevents)

module.exports=router
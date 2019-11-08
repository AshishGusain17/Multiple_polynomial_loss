const express=require('express');
const router=express.Router();
const sketch=require('../controllers/sketch');


router.get('/',sketch.index_form);

router.post('/index_form',sketch.postindex_form);


module.exports=router; 
const express = require('express');
router = express.Router();
const Unit = require('../models/unit');

router.post('/create',(req,res,next)=>{
    
});

router.get('/:id',(req,res,next)=>{
    Unit.find({id:req.params.id},(err,unit)=>{
        if(err){
            res.status(400).send(`Error finding unit - ${err}`);
        }else{
            res.status(201).send({unit:unit});
        }
    })
});




module.exports = router;
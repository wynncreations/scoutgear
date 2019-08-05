const express = require('express');
router = express.Router();
const InventoryCategory = require('../models/inventoryCategories');


//Return all categories
router.get('',(req,res,next)=>{
    InventoryCategory.find({},(err,categories)=>{
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send({
                categories: categories
            });
        }
    });
});

//Add a category
router.get('/add/:label',(req,res,next)=>{
    var category = new InventoryCategory({
        Label: req.params.label
    });

    category.save((err)=>{
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send(`Successfully added ${req.params.label}`);
        }
    });
});

//Delete a category
router.get('/delete/:id',(req,res,next)=>{
    InventoryCategory.remove({_id:req.params.id},(err)=>{
        if(err){
            res.status(400).send(`Error deleting ID - ${req.params.id} Error - ${err}`);
        }else{
            res.status(200).send(`Successfully deleted ${req.params.id}`)
        }
    });

    //yep
});


module.exports = router;
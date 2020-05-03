var express = require('express');
var Dir = require("./model").Dir;
var Chapter = require("./model").Chapter;
var router = express.Router();
// var ObjectId = require("mongodb").ObjectId;
router.route('/queryAllDir')
    .post(function(req, res) {
        Dir.find({},function(err, dirs) {
            if (err)
                res.send(err);
            else res.json(dirs);
        });
    })
router.route('/queryDirInfo')
.post(function(req, res) {
    Dir.find({"name":req.body.article_name},function(err, dirs) {
        if (err)
            res.send(err);
        else res.json(dirs);
    });
})
router.route('/queryAllChapterDir')
    .post(function(req, res) {
        Chapter.find({"article_name":req.body.article_name})
               .select("name url index")
               .sort("index")
               .exec(function(err, chapters){
                    if(err)
                        res.send(err);
                    else res.json(chapters)
                })
    })
router.route('/getChapterContent')
    .post(function(req, res) {
        // Chapter.find({_id:ObjectId(req.body._id)},function(err, chapter){
        //     if(err)
        //         res.send(err);
        //     else res.json(chapter)
        // })
        Chapter.find({article_name:req.body.article_name,index:req.body.index},function(err, chapter){
            if(err)
                res.send(err);
            else res.json(chapter)
        })
    })
module.exports = router

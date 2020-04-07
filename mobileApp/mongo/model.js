var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DirSchema = new Schema({
    name:String,
    url:String,
    last:String,
    count:Number,
    domain:String
})
var ChapterSchema = new Schema({
    name: String,
    url:String,
    content:String,
    index:Number
})

module.exports = {
    Dir:mongoose.model('dir', DirSchema),
    Chapter:mongoose.model('chapter', ChapterSchema)
}
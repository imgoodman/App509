var mongoose=require('mongoose');
var movieSchema=require('../schemas/movie');
var movieModel=mongoose.model('movie',movieSchema);
module.exports=movieModel;
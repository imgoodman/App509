var mongoose=require('mongoose');
var movieCategorySchema=require('../schemas/movie_category');
var model=mongoose.model('movie_category',movieCategorySchema);
module.exports=model;
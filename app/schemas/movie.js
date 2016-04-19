var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var movieSchema=new Schema({
	name:String,
	categories:{
		type:[ObjectId],
		ref:'movie_category'
	},
	publish:Date,
	allowInChina:Boolean,
	poster:String,
	remarks:String
});
module.exports=movieSchema;
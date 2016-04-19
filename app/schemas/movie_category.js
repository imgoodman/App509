var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var movieCategorySchema=new Schema({
	name:String,
	remarks:String,
	movies:{
		type:[ObjectId],
		ref:'movie'
	}
});

module.exports=movieCategorySchema;
var movieModel=require('../models/movie');
var movieCategoryModel=require('../models/movie_category');

exports.list=function(req,res){
	res.render('movie/list');	
};

exports.showCreate=function(req,res){	
	movieCategoryModel.find({},function(err,cats){
		if(err){
			console.log(err.stack);
		}else{
			var context={
				movie_categories:cats.map(function(item){
					return {
						_id:item._id,
						name:item.name
					};
				})
			};
			res.render('movie/create',context);
		}
	});
};
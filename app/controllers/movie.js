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

exports.save=function(req,res){
	console.log('name: '+req.body.name);
	console.log('category: '+req.body.category+" ,type is: "+ type(req.body.category));
	console.log('publish: '+req.body.publish);
	console.log('allowInChina: '+req.body.allowInChina);
	console.log('poster: '+req.body.poster);
	console.log('remarks: '+req.body.remarks);
	var movie=new movieModel({
		name:req.body.name,
		publish:req.body.publish,
		allowInChina:req.body.allowInChina,
		remarks:req.body.remarks,
		categories:[]
	});
	var cats=req.body.category.split(',');
	for(var cat in cats){
		console.log(cat);
		movie.categories.push(cat);
	}
	movie.save(function(err,res){
		if(err){
			console.log(err);
		}else{
			res.redirect(303,'/movie/list');
		}
	});
};
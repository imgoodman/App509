var movieCategoryModel=require('../models/movie_category');

exports.showCreate=function(req,res){
	res.render('movie_category/create');
};

exports.save=function(req,res){
	var movie_category = new movieCategoryModel({
		name:req.body.name,
		remarks:req.body.remarks
	});
	movie_category.save(function(err,cat){
		if(err){
			console.log(err);
			if(req.xhr){
				return res.json({error:'Database error'});
			}else{
				res.locals.flash={
					type:'danger',
					intro:'Database error',
					message:'There is a problem in database, please try again later'
				};
				res.render('movie_category/create');
			}
		}else{
			if(req.xhr){
				return res.json({success:true});
			}else{
				res.locals.flash={
					type:'success',
					intro:'Thank you',
					message:'You have already created a new movie category!'
				};
				res.render('movie_category/create');
			}
		}
	});
};

exports.list=function(req,res){
	movieCategoryModel.find({},function(err,cats){
		var context={
			movie_categories:cats.map(function(item){
				return {
					id:item._id,
					name:item.name,
					remarks:item.remarks
				}
			})
		};
		res.render('movie_category/list',context);
	});
};

exports.showUpdate=function(req,res){
	var _id=req.params.id;
	movieCategoryModel.findOne({_id:_id},function(err,cat){
		if(err){
			console.log(err);		
		}else{
			var context={
				_id:_id,
				name:cat.name,
				remarks:cat.remarks
			};
			res.render('movie_category/update',context);
		}
	});
};

exports.update=function(req,res){
	var _id=req.body._id;
	var name=req.body.name;
	var remarks=req.body.remarks;
	movieCategoryModel.update({_id:_id},{$set:{
		name:name,
		remarks:remarks
	}},function(err,result){
		if(err){
			console.log(err.stack);
		}else{
			res.redirect(303,'/movie_category/list');
		}
	});
};

exports.delete=function(req,res){
	var _id=req.params.id;
	movieCategoryModel.remove({_id:_id},function(err,result){
		if(err){
			console.log(err.stack);
		}else{
			res.redirect(303,'/movie_category/list');
		}
	});
};
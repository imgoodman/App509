var express=require('express');

var app=express();

//设置静态资源目录
app.use(express.static(__dirname+'/public'));

var credentials=require('./app/config/credentials');

//body-parser
app.use(require('body-parser')());

//禁止输出x-powered-by
app.disable('x-powered-by');

//设置视图目录
app.set('views',__dirname+'/app/views');

//设置视图引擎
var handlebars=require('express-handlebars').create({
	defaultLayout:__dirname+'/app/views/layouts/main',
	helpers:{
		section:function(name,options){
			//实现段落section的辅助方法
			if(!this._sections) this._sections={};
			this._sections[name]=options.fn(this);
			return null;
		}
	}
});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//设置数据库
var mongoose=require('mongoose');
mongoose.connect(credentials.mongo.development.connectionString);

//关于cookie和session
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

//消息显示中间件
app.use(function(req,res,next){
	// res.locals.flash=req.session.flash;
	// delete req.session.flash;
	delete res.locals.flash;
	next();
});

//电影分类的路由
var movie_category=require('./app/controllers/movie_category');
app.get('/',movie_category.list);
app.get('/movie_category/list',movie_category.list)
app.get('/movie_category/create',movie_category.showCreate);
app.post('/movie_category/create',movie_category.save);
app.get('/movie_category/update/:id',movie_category.showUpdate);
app.post('/movie_category/update/:id',movie_category.update);
app.post('/movie_category/delete/:id',movie_category.delete);

//电影的路由
var movie=require('./app/controllers/movie');
app.get('/movie/list',movie.list);
app.get('/movie/create',movie.showCreate);

//404
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

//500
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(3000,function(){
	console.log('Server running at http://localhost:3000');
});
var express=require('express');

var app=express();

//设置静态资源目录
app.use(express.static(__dirname+'/public'));

//禁止输出x-powered-by
app.disable('x-powered-by');

//设置视图目录
app.set('views',__dirname+'/app/views');

//设置视图引擎
var handlebars=require('express-handlebars').create({
	defaultLayout:__dirname+'/app/views/layouts/main'
});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


//红色对象目标的路由
var red_obj=require('./app/controllers/red_obj');
app.get('/',red_obj.list);
app.get('/red_obj/create',red_obj.create);

app.listen(3000,function(){
	console.log('Server running at http://localhost:3000');
});
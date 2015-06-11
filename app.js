var express = require("express"),
app = express(),
db = require('./models'),
methodOverride = require('method-override'),
bodyParser = require('body-parser'),
morgan = require('morgan');

//set middleware
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes

app.get('/', function(req, res){
	res.render('books/search');
});

app.get('/books', function(req, res){
	db.Animal.find({}, function(err, books){
		if(err){
			res.render('errors/404')
		}
		else res.render('books/index', {books:books});
	})
});

//new
app.get('/books/new', function(req, res){
	res.render('books/new');
});

//create
app.post('/books', function(req, res){
	db.Animal.create(req.body.book, function(err){
		if(err){
			res.render('errors/404')
		}
		else {
			res.redirect('/books')
		}
	})
})

//show
app.get('/books/:id', function(req, res){
	db.Book.findById(req.params.id, function(err, book){
		if(err){
			res.render('errors/404')
		}
		else {
			res.render('books/show', {book:book});
		}
	})
})

//edit
app.get('/books/:id/edit', function(req, res){
	db.Book.findById(req.params.id, function(err, book){
		if(err){
			res.render('errors/404')
		}
		else res.render('books/edit', {book:book})
	})
})

//update
app.put('/books/:id', function(req, res){
	db.Book.findByIdAndUpdate(req.params.id, req.body.book, function(err, books){
		if(err){
			res.render('errors/404')
		}
		else res.redirect('/books')
	})
})

//destroy
app.delete('/books/:id', function(req, res){
	db.Book.findByIdAndRemove(req.params.id, function(err, book){
		if(err){
			res.render('errors/404')
		}
		else res.redirect('/books')
	})
})

//start server
app.listen(8080, function(){
	console.log("server started");
});

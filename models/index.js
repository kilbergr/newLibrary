var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/library_data");
mongoose.set('debug', true);
module.exports.Book = require('./book.js');

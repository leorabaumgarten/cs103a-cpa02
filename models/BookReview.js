'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var bookReviewSchema = Schema( {
  userId: ObjectId,
  username: String,
  title: String,
  author: String,
  genre: String,
  description: String,
  rating: Number,
} );

module.exports = mongoose.model( 'BookReview', bookReviewSchema );

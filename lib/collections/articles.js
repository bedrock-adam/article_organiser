Articles = new Mongo.Collection("articles");

Articles.allow({
  insert: function(userId, doc) {
    return !! userId;
  }
});

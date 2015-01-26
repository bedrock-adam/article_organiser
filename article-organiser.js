Articles = new Mongo.Collection("articles");

if (Meteor.isClient) {
  Template.articleRow.events({
    'click .delete': function(event) {
      Articles.remove(this._id);
    }
  });

  Template.articleTable.helpers({
    articles: function() {
      return Articles.find({}, {sort: {title: 1}});
    }
  });

  Template.articleForm.events({
    "submit .new": function(event) {
      var title = event.target.title.value;
      var content = event.target.content.value;

      Articles.insert({ title: title, content: content });

      event.target.title.value = "";
      event.target.content.value = "";

      return false;
    }
  });
}

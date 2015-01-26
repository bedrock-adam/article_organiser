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
    "submit form": function(e) {
      e.preventDefault();

      var article = {
        title: $(e.target).find('[name=title]').val(),
        content: $(e.target).find('[name=content]').val()
      };

      Articles.insert(article);

      Router.go('articleIndex');
    }
  });
}

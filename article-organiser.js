if (Meteor.isClient) {
  Template.articleRow.events({
    'click .delete': function(e) {
      e.preventDefault();

      if (confirm('Delete this post?')) {
        Articles.remove(this._id, function(error) {
          if(error) {
            alert(error.reason);
          } else {
            Router.go('articleIndex');
          }
        });
      }
    }
  });

  Template.articleTable.helpers({
    articles: function() {
      return Articles.find({}, {sort: {title: 1}});
    }
  });

  Template.articleNewForm.events({
    "submit form": function(e) {
      e.preventDefault();

      var articleProperties = {
        title: $(e.target).find('[name=title]').val(),
        content: $(e.target).find('[name=content]').val()
      };

      Articles.insert(articleProperties, function(error, _id) {
        if (error) {
          alert(error.reason);
        } else {
          Router.go('articleIndex');
        }
      });
    }
  });

  Template.articleEditForm.events({
    "submit form": function(e) {
      e.preventDefault();

      var _id = this._id;

      var articleProperties = {
        title: $(e.target).find('[name=title]').val(),
        content: $(e.target).find('[name=content]').val()
      };

      Articles.update(_id, { $set: articleProperties }, function(error) {
        if (error) {
          alert(error.reason);
        } else {
          Router.go('articleShow', {_id: _id});
        }
      });
    }
  });
}

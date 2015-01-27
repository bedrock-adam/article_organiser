Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('articles'); }
});

Router.route('/articles/new', {
  name: 'articleNew',
  data: function() { return { title: '', content: '' }; }
});
Router.route('/articles/:_id/edit', {
  name: 'articleEdit',
  data: function() { return Articles.findOne(this.params._id); }
});
Router.route('/articles/:_id', {
  name: 'articleShow',
  data: function() { return Articles.findOne(this.params._id); }
});
Router.route('/articles', {
  name: 'articleIndex'
});
Router.route('/', {
  name: 'root'
});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'articleNew'});
Router.onBeforeAction(requireLogin, {only: 'articleEdit'});

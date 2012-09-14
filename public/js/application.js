(function () {
  var AppView;

  AppView = Backbone.View.extend({
    el: $('#appContainer'),
    render: function () {
      var template = _.template($('#appTemplate').html());
      this.$el.html(template({}));
      return true;
    }
  });


  Router = Backbone.Router.extend({
    initialize: function () {
      var appView = new AppView();
      appView.render();

      Backbone.history.start();
    }
  });

  $(function () {
    var router = new Router();
  });
}());

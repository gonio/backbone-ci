$(function(){
    App.router = new App.Routers.Main("#body");
    Backbone.history.start();

    //var gists = new App.Collections.Gists({url : "data.json"});
    //
    //var gistsView = new App.Views.GistsView({collection:gists});
    //gists.fetch({reset : true});



});

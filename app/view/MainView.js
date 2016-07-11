App.Models.TaskModel = Backbone.Model.extend({
	url: function() {
		return this.action;
	},
	defaults : {
		user_id : App.user_id
	},
	initialize : function() {
		var day = new Date();
		this.setPara(day);
		this.action = "index.php/task";
	},
	setUrl : function(url) {
		this.action = url;
	},
	setPara : function(day) {
		this.clear();
		this.set({
			user_id : App.user_id,
			year : day.getFullYear(),
			month : day.getMonth(),
			day : day.getDate(),
			date : day,
			dept : App.dept
		});
	},
	setDate : function(offset, day) {
		if(typeof day === "undefined"){
			day = this.get("date");
		}
		day.setDate(day.getDate() + offset);
		this.setPara(day);
		this.fetch({
			type:'POST',
			data:this.toJSON()
		});
	},
	parse: function (response) {
		return (response);
	}
});
App.Views.MainView = Backbone.View.extend({
	initialize : function() {
		this.model.bind('sync', this.render, this);
	},
	render : function() {
		var compiledTemplate = _.template($('#mainView-tpl').html());

		$(this.el).html(compiledTemplate(this.model.toJSON()));

		var width = (document.body.clientWidth/7-1) + "px";
		$(".calElement").css("width",width);
		return this;
	},
	events : {
		"click .calElement" : "selectDate",
		"click #lastWeek" : "lastWeek",
		"click #thisWeek" : "thisWeek",
		"click #nextWeek" : "nextWeek",
		"click .taskTitle" : "listDetail",
		"change select.headerDept" : "selectChange",
		"click .calElement" : "dateChange"
	},
	selectDate : function(e){
		$(".calElement").removeClass("selected");
		$(e.currentTarget).addClass("selected");
	},
	lastWeek : function() {
		this.model.setDate(-7);
	},
	thisWeek : function() {
		this.model.setDate(0, new Date());
	},
	nextWeek : function() {
		this.model.setDate(7);
	},
	listDetail : function(e) {
		App.router.navigate(
			App.proTypeDetail[$(e.currentTarget).attr("taskType")]+"Detail/"+
			$(e.currentTarget).attr("taskid"),
			{trigger: true}
		);
	},
	selectChange : function(e) {
		App.dept = $(e.currentTarget).val();
		this.model.fetch({
			type:'POST',
			data:{
				user_id : App.user_id,
				year : this.model.get("year"),
				month : this.model.get("month"),
				day : this.model.get("day"),
				dept : $(e.currentTarget).val()
			}
		});
	},
	dateChange : function (e) {
		this.model.fetch({
			type:'POST',
			data:{
				user_id : App.user_id,
				year : this.model.get("year"),
				month : this.model.get("month"),
				day : this.model.get("day"),
				dept : App.dept,
				specify : $(e.currentTarget).attr("specify")
			}
		});
	}
});

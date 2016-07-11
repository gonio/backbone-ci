App.Routers.Main = Backbone.Router.extend({
	initialize:function (el) {
		this.el = el;
		this.taskModel = new App.Models.TaskModel();
	},
	// 路由表
	routes : {
		"": "index",
		"add" : "create",
		"edit" : "edit",
		"modify/:id" : "modify",
		"addTest" : "addTest",
		"testDetail" : "testDetail",
		"testDetail/:taskid" : "testDetail",
		"addHandle" : "addHandle",
		"handleDetail" : "handleDetail",
		"handleDetail/:taskid" : "handleDetail",
		"addBefore" : "addBefore",
		"beforeDetail" : "beforeDetail",
		"beforeDetail/:taskid" : "beforeDetail",
		"addAfter" : "addAfter",
		"afterDetail" : "afterDetail",
		"afterDetail/:taskid" : "afterDetail",
		"addOther" : "addOther",
		"otherDetail" : "afterDetail",
		"otherDetail/:taskid" : "afterDetail"
	},
	index :function () {
		if(!this.mainView){
			this.mainView = new App.Views.MainView({
				model : this.taskModel,
				el : this.el
			});
		}
		this.taskModel.fetch({
			type:'POST',
			data:{
				user_id : App.user_id,
				year : this.taskModel.get("year"),
				month : this.taskModel.get("month"),
				day : this.taskModel.get("day"),
				dept : App.dept
			}
		});

	},
	create : function() {
		if(!this.addView){
			this.addView = new App.Views.AddTask({
				el : this.el
			});
		}
		this.addView.render();
	},
	addTest: function() {
		if(!this.testView){
			this.testView = new App.Views.AddTest({
				el : this.el
			});
			App.currentViews.push(this.testView);
		}
		this.clean(this.testView);
		this.testView.model.setUrl('create');
		this.testView.clearData();
		this.testView.render();
	},
	testDetail: function(taskid) {
		if(!this.testView){
			this.testView = new App.Views.AddTest({
				el : this.el
			});
			App.currentViews.push(this.testView);
		}
		this.clean(this.testView);

		this.testView.model.setUrl('detail');
		this.testView.model.fetch({
			type:'POST',
			data:{
				task_id : taskid
			}
		});
	},
	addHandle: function() {
		if(!this.handleView){
			this.handleView = new App.Views.AddHandle({
				el : this.el
			});
			App.currentViews.push(this.handleView);
		}
		this.clean(this.handleView);
		this.handleView.model.setUrl('create');
		this.handleView.clearData();
		this.handleView.render();
	},
	handleDetail: function(taskid) {
		if(!this.handleView){
			this.handleView = new App.Views.AddHandle({
				el : this.el
			});
			App.currentViews.push(this.handleView);
		}
		this.clean(this.handleView);
		this.handleView.model.setUrl("detail");
		this.handleView.model.fetch({
			type:'POST',
			data:{
				task_id : taskid
			}
		});
	},
	addAfter: function() {
		if(!this.afterView){
			this.afterView = new App.Views.AddAfter({
				el : this.el
			});
			App.currentViews.push(this.afterView);
		}
		this.clean(this.afterView);
		this.afterView.model.setUrl('create');
		this.afterView.clearData();
		this.afterView.render();
	},
	afterDetail: function(taskid) {
		if(!this.afterView){
			this.afterView = new App.Views.AddAfter({
				el : this.el
			});
			App.currentViews.push(this.afterView);
		}
		this.clean(this.afterView);
		this.afterView.model.setUrl("detail");
		this.afterView.model.fetch({
			type:'POST',
			data:{
				task_id : taskid
			}
		});
	},
	addBefore: function() {
		if(!this.beforeView){
			this.beforeView = new App.Views.AddBefore({
				el : this.el
			});
			App.currentViews.push(this.beforeView);
		}
		this.clean(this.beforeView);
		this.beforeView.model.setUrl('create');
		this.beforeView.clearData();
		this.beforeView.render();
	},
	beforeDetail: function(taskid) {
		if(!this.beforeView){
			this.beforeView = new App.Views.AddBefore({
				el : this.el
			});
			App.currentViews.push(this.beforeView);
		}
		this.clean(this.beforeView);
		this.beforeView.model.setUrl("detail");
		this.beforeView.model.fetch({
			type:'POST',
			data:{
				task_id : taskid
			}
		});
	},
	addOther: function() {
		if(!this.otherView){
			this.otherView = new App.Views.AddOther({
				el : this.el
			});
			App.currentViews.push(this.otherView);
		}
		this.clean(this.otherView);
		this.otherView.model.setUrl('create');
		this.otherView.clearData();
		this.otherView.render();
	},
	otherDetail: function(taskid) {
		if(!this.otherView){
			this.otherView = new App.Views.AddOther({
				el : this.el
			});
			App.currentViews.push(this.otherView);
		}
		this.clean(this.otherView);
		this.otherView.model.setUrl("detail");
		this.otherView.model.fetch({
			type:'POST',
			data:{
				task_id : taskid
			}
		});
	},
	//避免视图间事件绑定干扰
	clean:function (view) {
		_.each(App.currentViews, function(item){
			item.undelegateEvents();
		});
		view.delegateEvents();
	}
});
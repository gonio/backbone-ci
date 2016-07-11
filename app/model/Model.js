/**
 * Created by DOKE on 2016/6/21.
 */
App.Models.BaseModel = Backbone.Model.extend({
	action : "index",
	url: function() {
		return "index.php/task/"+this.action;
	},
	setUrl : function(url) {
		this.action = url;
	},
	parse: function (response) {
		return (response);
	},
	setSelfValue : function() {
		//子model自定义实现
	},
	//公共字段赋值，接口人姓名、接口人电话、渠道公司、渠道联系方式、到达现场时间、其他描述
	setCommonValue : function() {
		this.set({
			"user_id" : App.user_id,
			"customer_contact_name" : $(this.tagName+" [name=customer_contact_name]").val(),
			"customer_contact_tel" : $(this.tagName+" [name=customer_contact_tel]").val(),
			"sale_name" : $(this.tagName+" [name=sale_name]").val(),
			"sale_tel" : $(this.tagName+" [name=sale_tel]").val(),
			"arrive_time" : $(this.tagName+" [name=arrive_time]").val(),
			"desc" : $(this.tagName+" [name=desc]").val()
		});
	},
	isInvalid : function () {
		var invalid = false;
		//验证必填字段
		_.each($("input[required=required]"), function (item) {
			var itemDiv = $(item).parent();
			if($(item).val() === ""){
				invalid = true;
				if(!itemDiv.hasClass("invalid")) {itemDiv.addClass("invalid");}
			} else {
				if(itemDiv.hasClass("invalid")) {itemDiv.removeClass("invalid");}
			}
		});
		//验证手机号
		_.each($("input[type=number]"), function (item) {
			var itemDiv = $(item).parent(),
				regex = /^[0-9]*$/;
			if($(item).val().length < 8 || $(item).val().length >13){
				invalid = true;
				if(!itemDiv.hasClass("invalid")) {itemDiv.addClass("invalid");}
			} else if(!regex.test($(item).val())) {
				invalid = true;
				if(!itemDiv.hasClass("invalid")) {itemDiv.addClass("invalid");}
			} else {
				if(itemDiv.hasClass("invalid")) {itemDiv.removeClass("invalid");}
			}
		});
		return invalid;
	}
});
App.Models.AddTestModel = App.Models.BaseModel.extend({
	tagName : "#testForm",
	defaults : {
		"title" : "新增测试上门",
		"customer_name" : "",
		"customer_industry" : "1",
		"customer_rel" : "1",
		"project_level" : "1",
		"customer_contact_name" : "",
		"customer_contact_tel" : "",
		"sale_name" : "",
		"sale_tel" : "",
		"arrive_time" : "",
		"man_hour" : "1",
		"test_desc" : "",
		"test_competitor" : "",
		"desc" : "",
		"create_user" : "",
		"create_time" : "",
		"mod_time" : "",
		"task_type" : 1,
		"user_id" : 0
	},
	setSelfValue : function() {
		this.set({
			"customer_name" : $(this.tagName+" [name=customer_name]").val(),
			"customer_industry" : $(this.tagName+" [name=customer_industry]").val(),
			"customer_rel" : $(this.tagName+" [name=customer_rel]").val(),
			"project_level" : $(this.tagName+" [name=project_level]").val(),
			"man_hour" : $(this.tagName+" [name=man_hour]").val(),
			"test_desc" : $(this.tagName+" [name=test_desc]").val(),
			"test_competitor" : $(this.tagName+" [name=test_competitor]").val()
		});
	}
});
App.Models.AddHandleModel = App.Models.BaseModel.extend({
	tagName : "#handleForm",
	defaults : {
		"title" : "新增实施上门",
		"project_name" : "",
		"project_level" : "1",
		"customer_contact_name" : "",
		"customer_contact_tel" : "",
		"sale_name" : "",
		"sale_tel" : "",
		"arrive_time" : "",
		"desc" : "",
		"create_user" : "",
		"create_time" : "",
		"mod_time" : "",
		"task_type" : 2,
		"user_id" : 0
	},
	setSelfValue : function() {
		this.set({
			"project_name" : $(this.tagName+" [name=project_name]").val(),
			"project_level" : $(this.tagName+" [name=project_level]").val()
		});
	}
});
App.Models.AddAfterModel = App.Models.BaseModel.extend({
	tagName : "#afterForm",
	defaults : {
		"title" : "新增售后上门",
		"customer_name" : "",
		"online_type" : "1",
		"customer_contact_name" : "",
		"customer_contact_tel" : "",
		"sale_name" : "",
		"sale_tel" : "",
		"arrive_time" : "",
		"desc" : "",
		"create_user" : "",
		"create_time" : "",
		"mod_time" : "",
		"task_type" : 3,
		"user_id" : 0
	},
	setSelfValue : function() {
		this.set({
			"customer_name" : $(this.tagName+" [name=customer_name]").val(),
			"online_type" : $(this.tagName+" [name=online_type]").val()
		});
	}
});
App.Models.AddBeforeModel = App.Models.BaseModel.extend({
	tagName : "#beforeForm",
	defaults : {
		"title" : "新增售前上门",
		"customer_name" : "",
		"online_type" : "1",
		"customer_contact_name" : "",
		"customer_contact_tel" : "",
		"sale_name" : "",
		"sale_tel" : "",
		"arrive_time" : "",
		"desc" : "",
		"create_user" : "",
		"create_time" : "",
		"mod_time" : "",
		"task_type" : 4,
		"user_id" : 0
	},
	setSelfValue : function() {
		this.set({
			"customer_name" : $(this.tagName+" [name=customer_name]").val(),
			"online_type" : $(this.tagName+" [name=online_type]").val()
		});
	}
});
App.Models.AddOtherModel = App.Models.BaseModel.extend({
	tagName : "#otherForm",
	defaults : {
		"title" : "新增其他上门",
		"customer_name" : "",
		"online_type" : "1",
		"customer_contact_name" : "",
		"customer_contact_tel" : "",
		"sale_name" : "",
		"sale_tel" : "",
		"arrive_time" : "",
		"desc" : "",
		"create_user" : "",
		"create_time" : "",
		"mod_time" : "",
		"task_type" : 5,
		"user_id" : 0
	},
	setSelfValue : function() {
		this.set({
			"customer_name" : $(this.tagName+" [name=customer_name]").val()
		});
	}
});
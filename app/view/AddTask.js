/**
 * Created by DOKE on 2016/6/21.
 */
App.Views.AddTask = Backbone.View.extend({
    render : function() {

        $(this.el).html($('#add-tpl').html());
        return this;
    }
});

/**
 * 基类view
 */
App.Views.BaseView = Backbone.View.extend({
    tplSelector : "body",
    model : new App.Models.AddTestModel(),
    events : {
        "click .submitButton" : "submit",
        "click .deleteButton" : "delete",
        "keyup input[required=required]" : "isInvalid"
    },
    initialize : function() {
        this.model.setUrl("create");
        this.model.bind("sync", this.render, this);
    },
    render : function(model, resp, options) {
        if(options && options.silent){
            return;
        }
        var compiledTemplate = _.template($(this.tplSelector).html());
        this.$el.html(compiledTemplate(this.model.toJSON()));

        //非创建者则禁止修改和删除
        this.setDisabled();
        return this;
    },
    clearData : function() {
        this.model.clear();
        this.model.set(this.model.defaults);
    },
    isInvalid : function () {
      return this.model.isInvalid();
    },
    submit : function() {
        if(this.isInvalid()){
            return false;
        }
        if(location.href.indexOf("add")>-1){
            this.model.setUrl("create");
            this.clearData();
        } else {
            this.model.setUrl("update");
        }
        this.model.setSelfValue();
        this.model.setCommonValue();
        this.model.fetch({
            type:'POST',
            data:this.model.toJSON(),
            silent: true,//不触发sync事件
            success : function(obj, resp) {
                if(resp.success) {
                    App.router.navigate('/', {trigger : true});
                } else {
                    alert(resp.msg);
                }
            }
        });
    },
    delete : function() {
        this.model.setUrl("delete");
        this.model.fetch({
            type:'POST',
            data:{
                task_id : this.model.get("task_id"),
                user_id : App.user_id
            },
            silent: true,//不触发sync事件
            success : function(obj, resp) {
                if(resp.success) {
                    App.router.navigate('/', {trigger : true});
                } else {
                    alert(resp.msg);
                }
            }
        });
    },
    setDisabled : function () {
        if(this.model.get("user_id") && this.model.get("user_id") != App.user_id){
            $("input,select,textArea").attr("disabled", "disabled");
        }
    }
});

/**
 * 测试、实施、售后、售前、其他 **********************************************************
 */

App.Views.AddTest = App.Views.BaseView.extend({
    tplSelector : "#test-tpl",
    model : new App.Models.AddTestModel()
});

App.Views.AddHandle = App.Views.BaseView.extend({
    tplSelector : "#handle-tpl",
    model : new App.Models.AddHandleModel()
});

App.Views.AddAfter = App.Views.BaseView.extend({
    tplSelector : "#after-tpl",
    model : new App.Models.AddAfterModel()
});

App.Views.AddBefore = App.Views.BaseView.extend({
    tplSelector : "#before-tpl",
    model : new App.Models.AddBeforeModel()
});

App.Views.AddOther = App.Views.BaseView.extend({
    tplSelector : "#other-tpl",
    model : new App.Models.AddOtherModel()
});
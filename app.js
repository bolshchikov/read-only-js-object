/**
 * @author bolshchikov
 */


var App = Ember.Application.create({
	data: {
		action: "Add",
		childrenNames: "userSystemMails",
		id: "30",
		links: ["keeping", "things", "real"],
		nwid: "288230376152062423",
		type: "controlpanel/profiles/users/user",
		userSystemMails: [{title: "message1"}, {title: "message2"}],
		viewId: 2,
		users: {
			garry: true,
			emilia: false
		}
	}
});

App.IndexController = Ember.Controller.extend({
	model1: App.data,
	model2: window.readOnly(App.data),
	actions: {
		add: function () {
			App.data.userSystemMails.pushObject({'title': App.data.userSystemMails.length + 1});
//			console.log(this.model1);
//			console.log(this.model2);
		},
		remove: function () {
			App.data.userSystemMails.popObject();
//			console.log(this.model1.userSystemMails);
//			console.log(this.model2.userSystemMails);
		},
		increment: function () {
			Ember.set(App.data, 'id', parseInt(App.data.id, 10) + 1);
//			console.log(this.model1);
//			console.log(this.model2);
		}
	}
});
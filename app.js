/**
 * @author bolshchikov
 */

(function (global) {
	var data,
			module1 = {},
			module2 = {};

	data = {
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
	};

	module1.data = data;
	module2.data = global.readOnly(data);

	module1.data.userSystemMails.pop();

	console.log(module1.data);
	console.log(module2.data);

})(window);
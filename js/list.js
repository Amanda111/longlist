module.exports = function() {
//config
var Vue=require('vue');
var request = require('superagent');
Vue.config.delimiters = ['${', '}'];
var app = require('./infinite.vue');

new Vue({
		el: "#wrap",
		components:{app:app}
	})
}
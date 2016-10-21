import Vue from 'vue'
import app from '../../src/infinite.vue'

//listData component
var listData = Vue.component('item', {
	props:['listdata', 'dataH'],
	template: '<div>{{listdata}}</div>'
})

//loding block component
var loding = Vue.component('loding', {
	props:['lodingH'],
	template: '<div>loding</div>'
})

var infinite = {
	mixins:[app],
	components:{
		item: listData,
		loding:loding
	}
}
new Vue({
	el: "body",
	data:{
		dataH:50,
		lodingH:30,
		url:'/api',
		no:20,
		num:80
	},
	components:{scroll:infinite}
})
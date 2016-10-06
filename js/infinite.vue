<template>
<div class="box" v-el:box>
	<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
	<table>
		<tr v-for="li in list | show">
			<td>${ li.text }</td>
		</tr>
	</table>
</div>
</template>
<style>
	*{
		margin: 0px;
		padding:0px;
	}
	.box{
		width: 500px;
		height: 500px;
		overflow: scroll;
	}
	td{
		height: 50px;
	}
</style>
<script>
	var request = require('superagent');
	export default {
		data (){
			return {
				index:0,
				list:[],
				scroll:0,
				bottomh:0,
				toph:0,
				scrollh:0,
				no:0,
				tdh:50
			}
		},
		created(){
			var self = this
			request
				.get('/api')
				.query({start:0})
   				.query({count: 20})
				.end(function(err,res){
					self.index+=30
					Array.prototype.slice.call(res.body).forEach(function(element,index){
						self.list.push({ text: element, show: true})
					})
				})
		},
		methods:{
			onScroll(){
				if (this.$els.box.scrollTop + this.$els.box.clientHeight  > this.$els.box.scrollHeight - 100) {
					var self = this
					request
						.get('/api')
						.query({start:0})
		   				.query({count: 5})
						.end(function(err,res){
							self.index+=5
							Array.prototype.slice.call(res.body).forEach(function(element,index){
								self.list.push({ text: element, show: true})
							})
						})					
				}
			},
			// handleScroll () {
			// 	this.scroll = this.$els.box.scrollTop
			// 	var boxh = this.$els.box.clientHeight
			// 	var num = this.scroll / this.scrollh * this.list.length
			// 	this.no = Math.ceil(num - 0.5)
			// 	this.toph = this.scroll
			// 	this.bottomh = this.scrollh - this.scroll
			// 	var  self = this
			// 	console.log(this.scrollh)
			// 	console.log(this.tdh)
   //  			// self.list.forEach(function(li){
   //     //  			li.show = false;
   //    	// 		})
	  //     		// self.$nextTick(function(){
			// 		for(var i = 0;i < 5000;i++){
			// 			(function(){
			// 				if(i >= self.no && i < self.no + 1000){
			// 					self.list.$set(i,{text:i,show :true})
			// 					// console.log(self.no)
			// 				}else{
			// 					self.list.$set(i,{text:i,show :false})
			// 				}
			// 			})(i)
			// 		}
			// 		if (this.toph> this.scrollh - this.tdh * 1000) {this.bottomh = 0}
	  //           // });
	  //      //      request
	  //      //      	.get('/api')   
	  //      //      	.query({ start: 0 })
   // 					// .query({ count: 5})
   // 					// .end(function(err,res){console.log(res)})
			// }
		},
		filters: {
	        show(list){
	            return list.filter(function(li) {
	                return li.show;
	            });
	        },
  		},
		ready () {
			this.$els.box.addEventListener('scroll', this.onScroll);
			this.scrollh = this.$els.box.scrollHeight
			// this.tdh = document.getElementsByTagName('td')[0].clientHeight
		}
	}
</script>
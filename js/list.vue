<template>
<div class="box" v-el:box v-bind:style="{ height: cntnr + 'px' }">
	<div style="height:5000px">
		<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
		<table>
			<tr v-for="li in list" >
				<td v-bind:style="{ height: tdh + 'px' }">${ li }</td>
			</tr>
		</table>
		<!-- <div class="bottom" v-bind:style="{ height: bottomh + 'px' }"></div> -->
	</div>
</div>
</template>
<style>
	*{
		margin: 0px;
		padding:0px;
	}
	.box{
		overflow: scroll;
	}
	table{
		border-collapse:collapse
	}
</style>
<script>
	var request = require('superagent');
	export default {
		data (){
			return {
				isScrolling:false,
				index:0,
				num:100,
				list:[],
				scroll:0,
				toph:0,
				bottomh:0,
				//user define 
				tdh:50,
				cntnr:500
			}
		},
		created(){
			var self = this
			request
				.get('/api')
				.query({start:0})
   				.query({ count: 20})
				.end(function(err,res){
					self.index+=20
					console.log(res.body)
					self.list = res.body
				})
		},
		ready () {
			this.$els.box.addEventListener('scroll', this.handleScroll);
		},
		methods:{
			doSomethingOnScroll (direction) {
				console.log("scrolldown")
		            request
	            	.get('/api')
	            	.query({start:0})
   					.query({ count: 5})
	            	.end(function(err,res){
		            	self.index += 5
						self.scroll = self.$els.box.scrollTop
	       				Array.prototype.slice.call(res.body).forEach(function(element,index){	       						
	       						self.list.push(element) 
	       					})
	       				console.log(self.index)
	       				self.list.splice(0,5)
	       				self.toph += 250
	            	})
			},
			handleScroll () {
				if (this.isScrolling) {
					return
				}
				this.isScrolling = true
				var self = this
				if (this.index < 100) {
					if (this.$els.box.scrollTop > self.scroll) {
						this.doSomethingOnScroll(1);
					}else{
						this.doSomethingOnScroll(-1);
					}
				}
				function scrolldown(){
					
				}
				function scrollup(){
					console.log("scrollup")
		            request
	            	.get('/api')
	            	.query({start:0})
   					.query({ count: 5})
	            	.end(function(err,res){
	            		self.index -= 5
	            		self.scroll = self.$els.box.scrollTop
	       				Array.prototype.slice.call(res.body).forEach(function(element,index){	       						
	       						self.list.unshift(element) 
	       						console.log(element)
	       					})
	       				self.list.splice(14,5)
	       				self.toph -= 250
	            	})					
				}
			}
		},

	}
</script>
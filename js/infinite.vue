<template>
<div class="box" v-el:box>
	<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
	<table>
		<tr v-for="li in list">
			<td v-bind:style="{ height: tdh + 'px' }">${ li }</td>
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
</style>
<script>
	var request = require('superagent');
	export default {
		data (){
			return {
				index:0,
				list:[],
				scroll:0,
				toph:0,
				tdh:50,
				no:5,
				num:20
			}
		},
		created(){
			var self = this
			request
				.get('/api')
				.query({start:0})
   				.query({count: 20})
				.end(function(err,res){
					self.index+=20
					Array.prototype.slice.call(res.body).forEach(function(element,index){
						self.list.push(element)
					})
				})
		},
		methods:{
			onScroll(){
				// console.log(this.$els.box.scrollTop + this.$els.box.clientHeight)
				// console.log(this.$els.box.scrollHeight)
				//scroll down or scroll up
					// if (this.index >=0 && this.index <= 100) {
						if (this.$els.box.scrollTop + this.$els.box.clientHeight  == this.$els.box.scrollHeight){
								this.doSomethingOnScroll(1);
							}else if (this.$els.box.scrollTop > this.toph - this.no * this.tdh && this.$els.box.scrollTop < this.toph){
									this.doSomethingOnScroll(-1);
						}
					// }
			},
			doSomethingOnScroll(e){
				if (e == 1) {
					var self = this
					// if (self.index <100) {
						request
							.get('/api')
							.query({start:self.index})
			   				.query({count: self.no})
							.end(function(err,res){								
									self.index+=self.no
									console.log(self.index)
									Array.prototype.slice.call(res.body).forEach(function(element,index){
										self.list.push(element)										
									})
									self.list.splice(0,self.no)
									self.toph+=self.no * self.tdh
							})
						// }
					}else if(e == -1){
						var self = this
							request
								.get('/api')
								.query({start:self.index})
				   				.query({count: self.no})
								.end(function(err,res){
									// if (self.index > 0){
										self.index-=self.no
										console.log(self.index)
										Array.prototype.slice.call(res.body).forEach(function(element,index){
											self.list.unshift(element)
											
										})
										self.list.splice(self.num-self.no-1,self.no)
										self.toph-=self.no * self.tdh
									// }
									
								})
					}
				}
			// }
		},
		ready () {
			this.$els.box.addEventListener('scroll', this.onScroll);
		}
	}
</script>
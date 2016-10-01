<template>
<div class="box" v-el:box>
	<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
	<table>
		<tr v-for="li in list | show " track-by="$index">
			<td>${ $index }</td>
		</tr>
	</table>
	<div class="bottom" v-bind:style="{ height: bottomh + 'px' }"></div>
</div>
</template>
<style>
	.box{
		width: 500px;
		height: 200px;
		overflow: scroll;
	}
</style>
<script>
	var request = require('superagent');
	export default {
		data (){
			return {
				list:[],
				scroll:0,
				toph:0,
				bottomh:0,
				scrollh:0
			}
		},
		created: function(){
			for (var i = 0; i < 500; i++) {
				this.list.push({text:"1",show:true})
			}
		},
		methods:{
			handleScroll () {
				this.scroll = this.$els.box.scrollTop
				// var scrollh = this.$els.box.scrollHeight
				var boxh = this.$els.box.clientHeight
				var tdh = document.getElementsByTagName('td')[0].offsetHeight
				var num = this.scroll / this.scrollh * this.list.length
				var no = Math.ceil(num - 0.5)
				console.log(no)
				this.toph = num * tdh
				this.bottomh = this.scrollh - this.toph - tdh * 10
				var  self = this
    			self.list.forEach(function(li){
        			li.show = false;
      			})
	      		self.$nextTick(function(){
	      			self.list[no].show = true
					// for(var i = 0;i < 500;i++){
					// 	(function(){
					// 		if(i >= no  && i < no + 10){
					// 			self.list[i].show = true
					// 		}else{
					// 			self.list[i].show = false
					// 		}
					// 	})(i)
					}
	            });
			}
		},
		filters: {
	        show: function(list) {
	            return list.filter(function(li) {
	                return li.show;
	            });
	        },
  		},
		ready () {
			this.$els.box.addEventListener('scroll', this.handleScroll);
			this.scrollh = this.$els.box.scrollHeight
		}
	}
</script>
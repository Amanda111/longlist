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
				bottomh:0,
				scrollh:0,
				no:0,
				tdh:0
			}
		},
		created(){
			for (var i = 0; i < 500; i++) {
				this.list.push({text:"1",show:true})
			}
		},
		methods:{
			handleScroll () {
				this.scroll = this.$els.box.scrollTop
				var boxh = this.$els.box.clientHeight
				var num = this.scroll / this.scrollh * this.list.length
				this.no = Math.ceil(num - 0.5)
				this.bottomh = this.scrollh - this.scroll - this.tdh * 10
				var  self = this
    			// self.list.forEach(function(li){
       //  			li.show = false;
      	// 		})
	      		// self.$nextTick(function(){
					for(var i = 0;i < 500;i++){
						(function(){
							if(i >= self.no  && i < self.no + 10){
								self.list.$set(i,{show :true})
								console.log(self.no)
							}else{
								self.list.$set(i,{show :false})
							}
						})(i)
					}
	            // });
			}
		},
		filters: {
	        show(list){
	            return list.filter(function(li) {
	                return li.show;
	            });
	        },
  		},
		ready () {
			this.$els.box.addEventListener('scroll', this.handleScroll);
			this.scrollh = this.$els.box.scrollHeight
			this.tdh = document.getElementsByTagName('td')[0].offsetHeight
		}
	}
</script>
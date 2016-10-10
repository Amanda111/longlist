<template>
<div class="box" v-el:box>
	<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
	<table>
		<tr v-for="li in list">
			<td v-bind:style="{ height: tdh + 'px' }">${ li }</td>
		</tr>
		<td v-if="loding">loding</td>
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
		data () {
			return {
				index:0,
				list:[],
				scroll:0,
				toph:0,
				loding:false,
				//user define:
				tdh:50,
				no:10,
				num:20
			}
		},
		created() {
			//var self = this
			request
				.get('/api')
				.query({start:0})
				.query({count: 20})
				.end((err, res) => {
					if (err) throw err
					this.index+=20
					Array.prototype.slice.call(res.body)
						.forEach((element, index) => {
							this.list.push(element)
						})
				})
		},
		methods:{
			onScroll() {
			//console.log(this.$els.box.scrollTop + this.$els.box.clientHeight)
			//console.log(this.$els.box.scrollHeight)
			//scroll down or scroll up
			//if (this.index >=0 && this.index <= 100) {
				if (this.$els.box.scrollTop + this.$els.box.clientHeight===
					this.$els.box.scrollHeight) {
						this.loding= true
						this.doSomethingOnScroll(1)
				} else if (this.$els.box.scrollTop >
					this.toph - this.no * this.tdh &&
					this.$els.box.scrollTop < this.toph) {
						this.doSomethingOnScroll(-1);
				}
			//}
			},
			doSomethingOnScroll(direction) {
				if (direction===1) {
					//var self = this
					//if (self.index <100) {
						request
							.get('/api')
							.query({start:this.index})
							.query({count: this.no})
							.end((err, res) => {
								if (err) throw err
								this.index+=this.no
								this.index = false
								console.log(this.index)
								Array.prototype.slice.call(res.body)
									.forEach((element, index) => {
										this.list.push(element)
									})
								this.list.splice(0, this.no)
								this.toph+=this.no * this.tdh
							})
						//}
					} else if (direction===-1) {
						//var self = this
						request
							.get('/api')
							.query({start:this.index})
							.query({count: this.no})
							.end((err, res) => {
								if (err) throw err
								//if (this.index > 0){
								this.index-=this.no
								//console.log(this.index)
								Array.prototype.slice.call(res.body)
									.forEach((element, index) => {
										this.list.unshift(element)
								})
								this.list.splice(this.num-this.no-1, this.no)
								this.toph-=this.no * this.tdh
								//}
							})
					}
				}
			//}
		},
		ready () {
			this.$els.box.addEventListener('scroll', this.onScroll);
		}
	}

</script>
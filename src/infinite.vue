<template>
	<div class="top" v-bind:style="{ height: toph + 'px' }"></div>
	<div>
		<item v-for="li in list" :listdata="li" v-bind:style="{ height: height + 'px' }"></item>
		<loding v-bind:style="{ height: lodingh + 'px' }" v-if="loding"></loding>
	</div>
</template>
<style>
	*{
		margin: 0px;
		padding:0px;
		height: 100%;
	}
	body{
		height: 100%;
	}
</style>
<script>
	import request from 'superagent'
	export default {
		data () {
			return {
				index:0,
				list:[],
				scroll:0,
				toph:0,
				loding:false
			}
		},
		props:['height', 'no', 'num', 'url', 'lodingh'],
		created() {
			request
				.get(this.url)
				.query({start:0})
				.query({count: this.num})
				.end((err, res) => {
					if (err) throw err
					this.index+=this.num
					Array.prototype.slice.call(res.body)
						.forEach((element, index) => {
							this.list.push(element)
						})
				})
		},
		methods:{
			onScroll() {
			//scroll down or scroll up

			//if it is not infinite
			//if (this.index >=0 && this.index <= 100) {

				//if it scrolls in a div bot not the window
				// if (this.$els.box.scrollTop + this.$els.box.clientHeight===
				//	this.$els.box.scrollHeight) {
				// 		this.loding= true
				// 		this.doSomethingOnScroll(1)
				// } else if (this.$els.box.scrollTop >
				// 	this.toph - this.no * this.height &&
				// 	this.$els.box.scrollTop < this.toph) {
				// 		this.doSomethingOnScroll(-1);

				if (document.body.scrollTop +document.body.clientHeight===
					document.body.scrollHeight) {
						this.loding= true
						this.doSomethingOnScroll(1)	
				} else if (document.body.scrollTop >
					this.toph - this.no * this.height &&
					document.body.scrollTop < this.toph) {
						this.doSomethingOnScroll(-1);
				}
			},
			doSomethingOnScroll(direction) {
				if (direction===1) {
					//if (self.index <100) {
						request
							.get(this.url)
							.query({start:this.index})
							.query({count: this.no})
							.end((err, res) => {
								if (err) throw err
								this.preindex = this.index
								this.index+=this.no
								console.log(this.index)
								Array.prototype.slice.call(res.body)
									.forEach((element, index) => {
										this.list.push(element)
									})
								this.list.splice(0, this.no)
								this.toph+=this.no * this.height
								this.loding = false
							})
						//}
					} else if (direction===-1) {
						request
							.get('/api')
							.query({start:this.index})
							.query({count: this.no})
							.end((err, res) => {
								if (err) throw err
								//if (this.index > 0){
								this.index-=this.no
								Array.prototype.slice.call(res.body).reverse()
									.forEach((element, index) => {
										this.list.unshift(element)
								})
								this.list.splice(this.num-this.no-1, this.no)
								this.toph -= this.no * this.height
								this.loding = false
								//}
							})
					}
				}
			//}
		},
		ready () {
			window.addEventListener('scroll', this.onScroll);
		}
	}

</script>